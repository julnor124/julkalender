import { NextRequest, NextResponse } from "next/server";
import {
  clearAuthCookies,
  getSpotifyConfig,
  getStateFromCookies,
  getVerifierFromCookies,
  setTokenCookie,
  spotifyCookieNames,
} from "@/services/spotifyAuthService";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  const errorParam = url.searchParams.get("error");

  const response = NextResponse.redirect(new URL("/door/10", request.url));

  if (errorParam) {
    console.error("Spotify authorization error:", errorParam);
    clearAuthCookies(response);
    response.cookies.set("spotify_error", errorParam, {
      httpOnly: false,
      maxAge: 60,
      sameSite: "lax",
      path: "/",
    });
    return response;
  }

  if (!code || !returnedState) {
    response.cookies.set("spotify_error", "missing_code_or_state", {
      httpOnly: false,
      maxAge: 60,
      sameSite: "lax",
      path: "/",
    });
    return response;
  }

  const storedState = getStateFromCookies(request);
  if (!storedState || storedState !== returnedState) {
    response.cookies.set("spotify_error", "state_mismatch", {
      httpOnly: false,
      maxAge: 60,
      sameSite: "lax",
      path: "/",
    });
    return response;
  }

  const verifier = getVerifierFromCookies(request);
  if (!verifier) {
    response.cookies.set("spotify_error", "missing_verifier", {
      httpOnly: false,
      maxAge: 60,
      sameSite: "lax",
      path: "/",
    });
    return response;
  }

  try {
    const { clientId, clientSecret, redirectUri } = getSpotifyConfig();

    const tokenParams = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: verifier,
    });

    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: tokenParams,
      cache: "no-store",
    });

    if (!tokenResponse.ok) {
      const details = await tokenResponse.text();
      console.error("Spotify token exchange failed", tokenResponse.status, details);
      response.cookies.set("spotify_error", "token_exchange_failed", {
        httpOnly: false,
        maxAge: 60,
        sameSite: "lax",
        path: "/",
      });
      return response;
    }

    const tokenData = await tokenResponse.json();
    const expiresAt = Date.now() + Number(tokenData.expires_in) * 1000;

    setTokenCookie(
      {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt,
      },
      response
    );

    // clean temporary cookies
    response.cookies.set(spotifyCookieNames.state, "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    response.cookies.set(spotifyCookieNames.verifier, "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    response.cookies.set("spotify_auth", "success", {
      httpOnly: false,
      maxAge: 60,
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Spotify callback handling failed", error);
    clearAuthCookies(response);
    response.cookies.set("spotify_error", "callback_exception", {
      httpOnly: false,
      maxAge: 60,
      sameSite: "lax",
      path: "/",
    });
    return response;
  }
}

