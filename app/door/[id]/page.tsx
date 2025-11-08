"use client";

import React, { FormEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getDoorById } from "@/lib/data/doors";

export default function DoorPage() {
  const params = useParams();
  const doorId = parseInt(params.id as string);
  const router = useRouter();

  const door = getDoorById(doorId);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handlePasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.trim().toLowerCase() !== "test") {
      setPasswordError("Fel lösenord. Försök igen.");
      return;
    }

    setPasswordError(null);
    router.push(`/door/${doorId}/game`);
  };

  if (!door) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#17152D] to-[#532BDC] flex items-center justify-center">
        <div className="text-white text-xl">Lucka hittades inte</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1240] to-[#3c1db4] text-[#fdf7f7] font-festive">
      {/* Snow effect */}
      <div className="snow"></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-2xl md:text-3xl mb-8" style={{color: '#F9DADA'}}>Välkommen till lucka {doorId}</h1>
          <p className="text-xl md:text-2xl mb-10" style={{color: '#F9DADA'}}>
            Skriv in lösenordet för att se vad som gömmer sig bakom luckan idag.
          </p>

          <form
            onSubmit={handlePasswordSubmit}
            className="mb-12 flex flex-col items-center"
            style={{
              gap: "clamp(0.75rem, 2vw, 1.5rem)",
              marginTop: "clamp(1.25rem, 3.5vw, 2.25rem)",
            }}
          >
            <div
              className="flex flex-col items-center"
              style={{ gap: "clamp(0.5rem, 1.5vw, 1rem)" }}
            >
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Lösenord..."
                className="block appearance-none text-center leading-none bg-[radial-gradient(circle_at_50%_40%,#1EDB25_0%,#27862A_100%)] text-[#F9DADA] placeholder-[#F9DADA]/80 rounded-lg font-bold shadow-[0_0_10px_rgba(0,0,0,0.4)] border-2 border-white/20 focus:outline-none focus:ring-2 focus:ring-[#F9DADA]"
                style={{
                  width: "min(75vw, 200px)",
                  height: "clamp(42px, 7vh, 44px)",
                  fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                  paddingInline: "clamp(0.75rem, 2vw, 1.5rem)",
                }}
              />
              <button
                type="submit"
                className="rounded-full bg-[#ffe89c] text-[#311066] font-semibold transition hover:bg-[#ffd45c]"
                style={{
                  minWidth: "min(55vw, 180px)",
                  paddingBlock: "clamp(8px, 1.6vw, 12px)",
                  paddingInline: "clamp(1.75rem, 4vw, 2.5rem)",
                  fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
                }}
              >
                Lås upp luckan
              </button>
            </div>
            {passwordError && (
              <span className="text-sm text-red-300">{passwordError}</span>
            )}
          </form>

        </div>
      </div>
    </div>
  );
}
