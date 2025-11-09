import { NextResponse } from "next/server";
import {
  createCodeChallenge,
  createRandomString,
  getSpotifyConfig,
  setStateCookie,
  setVerifierCookie,
  spotifyScopes,
} from "@/services/spotifyAuthService";

export async function GET() {
  try {
    const { clientId, redirectUri } = getSpotifyConfig();

    const verifier = createRandomString(128);
    const challenge = await createCodeChallenge(verifier);
    const state = createRandomString(16);

    const params = new URLSearchParams({
      client_id: clientId,
      response_type: "code",
      redirect_uri: redirectUri,
      scope: spotifyScopes.join(" "),
      state,
      code_challenge_method: "S256",
      code_challenge: challenge,
      show_dialog: "false",
    });

    const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

    const response = NextResponse.redirect(authUrl);
    setVerifierCookie(verifier, response);
    setStateCookie(state, response);

    return response;
  } catch (error) {
    console.error("Spotify login initialization failed", error);
    return NextResponse.json(
      { error: "Unable to start Spotify authentication" },
      { status: 500 }
    );
  }
}


