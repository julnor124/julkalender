"use client";

import type { FC } from "react";
import { DoorModel } from "@/models/door";
import { useDoorContentViewModel } from "@/viewmodels/useDoorGameViewModel";

interface DoorContentViewProps {
  door: DoorModel;
}

export const DoorContentView: FC<DoorContentViewProps> = ({ door }) => {
  const { title, description } = useDoorContentViewModel(door);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b33] via-[#1c0d52] to-[#26006f] text-[#fdf7f7] font-festive">
      <div className="snow pointer-events-none" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center px-4 pb-24 pt-16">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl text-[#F9DADA] drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
            {title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-[#F9DADA]/80 max-w-2xl mx-auto">
            {description}
          </p>
        </header>
      </main>
    </div>
  );
};

