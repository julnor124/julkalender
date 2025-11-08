"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getDoorById } from '@/lib/data/doors';

export default function DoorPage() {
  const params = useParams();
  const router = useRouter();
  const doorId = parseInt(params.id as string);
  
  const door = getDoorById(doorId);

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
          <p className="text-xl md:text-2xl mb-12" style={{color: '#F9DADA'}}>Skriv in lösenordet för att se vad som gömmer sig bakom luckan idag.</p>
          
          {/* Password input box */}
          <div className="mb-12">
           <input
   type="password"
   placeholder="Skriv lösenordet här..."
   className="block mx-auto w-96 md:w-[500px] h-32 md:h-40 appearance-none text-center leading-none px-8 bg-[radial-gradient(circle_at_50%_40%,#1EDB25_0%,#27862A_100%)] text-[#F9DADA] placeholder-[#F9DADA]/80 rounded-lg text-2xl md:text-3xl font-bold shadow-[0_0_10px_rgba(0,0,0,0.4)] border-2 border-white/20 focus:outline-none focus:ring-2 focus:ring-[#F9DADA]"
 />

          </div>

        </div>
      </div>
    </div>
  );
}
