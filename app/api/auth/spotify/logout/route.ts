import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/services/spotifyAuthService";

export async function POST() {
  const response = NextResponse.json({ success: true });
  clearAuthCookies(response);
  return response;
}


