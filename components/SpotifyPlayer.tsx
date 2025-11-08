"use client";

import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady?: () => void;
    Spotify: any;
  }
}

type PlayerState = {
  deviceId?: string;
  active?: boolean;
  error?: string;
};

export default function SpotifyPlayer() {
  const playerRef = useRef<any>(null);
  const [readyState, setReadyState] = useState<PlayerState>({});
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);

  useEffect(() => {
    if (document.getElementById("spotify-player-script")) {
      return;
    }
    const script = document.createElement("script");
    script.id = "spotify-player-script";
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = async () => {
      setIsInitializing(true);

      try {
        const token = await fetchAccessToken();
        const player = new window.Spotify.Player({
          name: "Julkalender Player",
          getOAuthToken: async (cb: (token: string) => void) => {
            try {
              const refreshed = await fetchAccessToken();
              cb(refreshed);
            } catch (tokenError) {
              console.error("Failed to refresh Spotify token", tokenError);
            }
          },
          volume: 0.5,
        });

        playerRef.current = player;

        player.addListener("ready", ({ device_id }: { device_id: string }) => {
          setReadyState({ deviceId: device_id, active: true });
          console.log("Ready with Device ID", device_id);
        });

        player.addListener("not_ready", ({ device_id }: { device_id: string }) => {
          setReadyState({ deviceId: device_id, active: false });
          console.warn("Device ID has gone offline", device_id);
        });

        player.addListener("player_state_changed", (state: any) => {
          if (!state) return;
          setIsPaused(state.paused);
        });

        ["initialization_error", "authentication_error", "account_error", "playback_error"].forEach(
          (eventName) => {
            player.addListener(eventName, ({ message }: { message: string }) => {
              console.error(`Spotify ${eventName}`, message);
              setReadyState((prev) => ({ ...prev, error: message }));
            });
          }
        );

        const connected = await player.connect();
        if (!connected) {
          setReadyState((prev) => ({
            ...prev,
            error: "Unable to establish connection with Spotify",
          }));
        }
      } catch (error) {
        console.error("Failed to initialize Spotify player", error);
        setReadyState({ error: "Initialization failed. Please try logging in again." });
      } finally {
        setIsInitializing(false);
      }
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.disconnect();
      }
      window.onSpotifyWebPlaybackSDKReady = undefined;
    };
  }, []);

  const togglePlayback = async () => {
    if (!playerRef.current) return;
    try {
      await playerRef.current.togglePlay();
    } catch (error) {
      console.error("Failed to toggle playback", error);
    }
  };

  const activateElement = () => {
    if (!playerRef.current) return;
    try {
      playerRef.current.activateElement();
    } catch (error) {
      console.error("Failed to activate Spotify player element", error);
    }
  };

  return (
    <div className="mt-8 flex w-full max-w-md flex-col items-center gap-4 rounded-xl bg-white/5 p-6 text-center backdrop-blur">
      <h3 className="text-lg font-semibold text-[#ffe89c] drop-shadow">
        Julkalender Player
      </h3>
      <p className="text-sm text-white/70">
        Transfer playback to this browser from any Spotify app, then use the controls below.
      </p>
      {readyState.deviceId && (
        <p className="text-xs text-white/60">
          Device ID: <span className="font-mono">{readyState.deviceId}</span>
        </p>
      )}
      {readyState.error && (
        <p className="text-sm text-red-300">Error: {readyState.error}</p>
      )}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={togglePlayback}
          className="rounded-full bg-[#ffe89c] px-4 py-2 text-[#360f55] transition hover:bg-[#ffd45c]"
          disabled={!readyState.active || isInitializing}
        >
          {isPaused ? "Play / Resume" : "Pause"}
        </button>
        <button
          type="button"
          onClick={activateElement}
          className="rounded-full border border-white/30 px-4 py-2 text-white transition hover:border-white/60"
          disabled={isInitializing}
        >
          Activate Audio
        </button>
      </div>
      {isInitializing && (
        <p className="text-xs text-white/60">Connecting to Spotify…</p>
      )}
    </div>
  );
}

async function fetchAccessToken(): Promise<string> {
  const response = await fetch("/api/spotify/token");
  if (!response.ok) {
    throw new Error("Unable to retrieve Spotify access token");
  }
  const data = await response.json();
  return data.token as string;
}

