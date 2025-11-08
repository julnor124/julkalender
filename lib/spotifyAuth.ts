import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

const TOKEN_COOKIE = "spotify_tokens";
const VERIFIER_COOKIE = "spotify_code_verifier";
const STATE_COOKIE = "spotify_auth_state";

if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
  console.warn(
    "Spotify environment variables are missing. Ensure SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REDIRECT_URI are set."
  );
}

export function getSpotifyConfig() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
    throw new Error(
      "Spotify configuration is incomplete. Check environment variables."
    );
  }

  return {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: REDIRECT_URI,
  };
}

export function createRandomString(length: number) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export async function createCodeChallenge(verifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const base64Digest = Buffer.from(digest).toString("base64");
  return base64Digest.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

type StoredTokens = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};

export function getTokenCookieStore(req?: NextRequest) {
  return req ? req.cookies : cookies();
}

export function getStoredTokens(req?: NextRequest): StoredTokens | null {
  const cookieStore = getTokenCookieStore(req);
  const raw = cookieStore.get(TOKEN_COOKIE)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredTokens;
    if (!parsed.accessToken || !parsed.refreshToken || !parsed.expiresAt) {
      return null;
    }
    return parsed;
  } catch (error) {
    console.error("Failed to parse stored Spotify tokens", error);
    return null;
  }
}

export function getStateFromCookies(req?: NextRequest) {
  const cookieStore = getTokenCookieStore(req);
  return cookieStore.get(STATE_COOKIE)?.value ?? null;
}

export function getVerifierFromCookies(req?: NextRequest) {
  const cookieStore = getTokenCookieStore(req);
  return cookieStore.get(VERIFIER_COOKIE)?.value ?? null;
}

export function clearAuthCookies(response: NextResponse) {
  [TOKEN_COOKIE, STATE_COOKIE, VERIFIER_COOKIE].forEach((name) =>
    response.cookies.set(name, "", {
      httpOnly: true,
      secure: true,
      maxAge: 0,
      sameSite: "lax",
      path: "/",
    })
  );
}

export async function refreshAccessToken(refreshToken: string) {
  const { clientId, clientSecret } = getSpotifyConfig();

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(
      "Spotify refresh token request failed",
      response.status,
      await response.text()
    );
    throw new Error("Failed to refresh Spotify access token");
  }

  const data = await response.json();
  const expiresAt = Date.now() + Number(data.expires_in) * 1000;

  return {
    accessToken: data.access_token as string,
    refreshToken: (data.refresh_token as string) ?? refreshToken,
    expiresAt,
  };
}

export type AccessTokenResult =
  | { accessToken: string; updatedTokens: StoredTokens | null; error?: false }
  | { accessToken: null; updatedTokens: null; error?: false }
  | { accessToken: null; updatedTokens: null; error: true };

export async function getValidAccessToken(
  req?: NextRequest
): Promise<AccessTokenResult> {
  const stored = getStoredTokens(req);
  if (!stored) return { accessToken: null, updatedTokens: null };

  const bufferMs = 60 * 1000;
  if (Date.now() < stored.expiresAt - bufferMs) {
    return { accessToken: stored.accessToken, updatedTokens: null };
  }

  try {
    const refreshed = await refreshAccessToken(stored.refreshToken);
    return {
      accessToken: refreshed.accessToken,
      updatedTokens: refreshed,
    };
  } catch (error) {
    console.error("Unable to refresh Spotify token", error);
    return { accessToken: null, updatedTokens: null, error: true as const };
  }
}

export function setVerifierCookie(verifier: string, response: NextResponse) {
  const expires = new Date(Date.now() + 15 * 60 * 1000);
  response.cookies.set({
    name: VERIFIER_COOKIE,
    value: verifier,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export function setStateCookie(state: string, response: NextResponse) {
  const expires = new Date(Date.now() + 15 * 60 * 1000);
  response.cookies.set({
    name: STATE_COOKIE,
    value: state,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export function setTokenCookie(tokens: StoredTokens, response: NextResponse) {
  response.cookies.set({
    name: TOKEN_COOKIE,
    value: JSON.stringify(tokens),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(tokens.expiresAt),
  });
}

export const spotifyScopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-read-playback-state",
  "user-modify-playback-state",
] as const;

export type SpotifyScope = typeof spotifyScopes[number];
export type SpotifyTokens = StoredTokens;

export const spotifyCookieNames = {
  tokens: TOKEN_COOKIE,
  state: STATE_COOKIE,
  verifier: VERIFIER_COOKIE,
};


