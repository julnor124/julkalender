import { NextRequest, NextResponse } from "next/server";
import {
  AccessTokenResult,
  clearAuthCookies,
  getValidAccessToken,
  setTokenCookie,
} from "@/lib/spotifyAuth";

export async function GET(request: NextRequest) {
  try {
    const result: AccessTokenResult = await getValidAccessToken(request);

    if (!result.accessToken) {
      const response = NextResponse.json(
        { error: "unauthorized" },
        { status: 401 }
      );
      clearAuthCookies(response);
      return response;
    }

    const response = NextResponse.json({ token: result.accessToken });

    if (result.updatedTokens) {
      setTokenCookie(result.updatedTokens, response);
    }

    return response;
  } catch (error) {
    console.error("Failed to provide Spotify token", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

