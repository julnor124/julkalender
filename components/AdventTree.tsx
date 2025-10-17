"use client";

import React, { useState } from "react";

type DoorProps = {
  n: number;
  variant?: "green" | "trunk" | "star";
  isOpen?: boolean;
  onClick?: () => void;
};

const Door: React.FC<DoorProps> = ({ n, variant = "green", isOpen = false, onClick }) => {
  const base = `
    relative flex items-center justify-center select-none 
    w-[80px] h-[80px] rounded-lg cursor-pointer transition-all duration-300 hover:scale-105
  `;

  const green = "bg-[radial-gradient(circle_at_50%_40%,#1EDB25_0%,#27862A_100%)]";
  const trunk = "bg-[radial-gradient(circle_at_50%_40%,#B78383_0%,#6A4343_100%)]";
  const star = "bg-[radial-gradient(circle_at_50%_40%,#ffed4e_0%,#ffd700_100%)]";

  const variantClasses = variant === "green" ? green : variant === "trunk" ? trunk : star;

  return (
    <div className={`${base} ${variantClasses}`} onClick={onClick}>
      <span className="text-center text-sm font-bold text-black">
        {variant === "star" ? "" : `${n}`}
      </span>
    </div>
  );
};

const Row: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`}>{children}</div>
);

export default function AdventTree() {
  const [openDoors, setOpenDoors] = useState<Set<number>>(new Set());

  const handleDoorClick = (doorNumber: number) => {
    setOpenDoors(prev => {
      const newSet = new Set(prev);
      if (newSet.has(doorNumber)) {
        newSet.delete(doorNumber);
      } else {
        newSet.add(doorNumber);
      }
      return newSet;
    });
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#17152D] to-[#532BDC] text-white">
      {/* Advanced snow effect */}
      <div className="snow"></div>

      <div className="relative w-full h-screen flex flex-col items-center justify-center px-4 py-8">

        {/* Headings */}
        <div className="flex items-center justify-between w-full max-w-6xl px-16 md:px-24 mb-8">
          {/* Left side text */}
          <h1 className="font-festive text-2xl md:text-4xl leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] text-right" style={{color: '#F9DADA'}}>
            DET BLIR JUL I ÅR IGEN
          </h1>
          
          {/* Right side text */}
          <h2 className="font-festive text-2xl md:text-4xl leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] text-left" style={{color: '#F9DADA'}}>
            JULKALENDER 2025
          </h2>
        </div>


        {/* Full Screen Christmas Tree */}
        <section className="flex flex-col items-center justify-center gap-3 mt-16">

          {/* Tree layers with proper spacing */}
          
          {/* Top layer - 1 door */}
          <Row>
            <Door n={24} isOpen={openDoors.has(24)} onClick={() => handleDoorClick(24)} />
          </Row>

          {/* Second layer - 2 doors */}
          <Row>
            <Door n={22} isOpen={openDoors.has(22)} onClick={() => handleDoorClick(22)} />
            <Door n={23} isOpen={openDoors.has(23)} onClick={() => handleDoorClick(23)} />
          </Row>

          {/* Third layer - 3 doors */}
          <Row>
            <Door n={19} isOpen={openDoors.has(19)} onClick={() => handleDoorClick(19)} />
            <Door n={20} isOpen={openDoors.has(20)} onClick={() => handleDoorClick(20)} />
            <Door n={21} isOpen={openDoors.has(21)} onClick={() => handleDoorClick(21)} />
          </Row>

          {/* Fourth layer - 4 doors */}
          <Row>
            <Door n={15} isOpen={openDoors.has(15)} onClick={() => handleDoorClick(15)} />
            <Door n={16} isOpen={openDoors.has(16)} onClick={() => handleDoorClick(16)} />
            <Door n={17} isOpen={openDoors.has(17)} onClick={() => handleDoorClick(17)} />
            <Door n={18} isOpen={openDoors.has(18)} onClick={() => handleDoorClick(18)} />
          </Row>

          {/* Fifth layer - 5 doors */}
          <Row>
            <Door n={10} isOpen={openDoors.has(10)} onClick={() => handleDoorClick(10)} />
            <Door n={11} isOpen={openDoors.has(11)} onClick={() => handleDoorClick(11)} />
            <Door n={12} isOpen={openDoors.has(12)} onClick={() => handleDoorClick(12)} />
            <Door n={13} isOpen={openDoors.has(13)} onClick={() => handleDoorClick(13)} />
            <Door n={14} isOpen={openDoors.has(14)} onClick={() => handleDoorClick(14)} />
          </Row>

          {/* Sixth layer - 6 doors */}
          <Row>
            <Door n={4} isOpen={openDoors.has(4)} onClick={() => handleDoorClick(4)} />
            <Door n={5} isOpen={openDoors.has(5)} onClick={() => handleDoorClick(5)} />
            <Door n={6} isOpen={openDoors.has(6)} onClick={() => handleDoorClick(6)} />
            <Door n={7} isOpen={openDoors.has(7)} onClick={() => handleDoorClick(7)} />
            <Door n={8} isOpen={openDoors.has(8)} onClick={() => handleDoorClick(8)} />
            <Door n={9} isOpen={openDoors.has(9)} onClick={() => handleDoorClick(9)} />
          </Row>

          {/* Trunk - 3 doors */}
          <div className="mt-4">
            <Row>
              <Door n={1} variant="trunk" isOpen={openDoors.has(1)} onClick={() => handleDoorClick(1)} />
              <Door n={2} variant="trunk" isOpen={openDoors.has(2)} onClick={() => handleDoorClick(2)} />
              <Door n={3} variant="trunk" isOpen={openDoors.has(3)} onClick={() => handleDoorClick(3)} />
            </Row>
          </div>
        </section>

      </div>
    </main>
  );
}
