"use client";

import React from "react";
import { useAdventCalendar } from "@/hooks/useAdventCalendar";
import Door from "@/components/Door";
import Link from "next/link";

const Row: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`flex items-center justify-center gap-4 ${className}`}>{children}</div>
);

export default function AdventTree() {
  const { toggleDoor, isDoorOpen, getDoorVariant } = useAdventCalendar();

  const handleDoorClick = (doorNumber: number) => {
    // Navigate to door page instead of just toggling
    window.location.href = `/door/${doorNumber}`;
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#17152D] to-[#532BDC] text-white">
      {/* Advanced snow effect */}
      <div className="snow"></div>

      <div className="relative w-full h-screen flex flex-col items-center justify-center px-4 py-8">

        {/* Heading */}
        <div className="flex items-center justify-center w-full mb-8">
          <h1 className="font-festive text-2xl md:text-4xl leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] text-center" style={{color: '#F9DADA'}}>
            JULKALENDER 2025
          </h1>
        </div>


        {/* Full Screen Christmas Tree */}
        <section className="flex flex-col items-center justify-center gap-3 mt-16">

          {/* Tree layers with proper spacing */}
          
          {/* Top layer - 1 door */}
          <Row>
            <Door 
              id={24} 
              variant={getDoorVariant(24)} 
              isOpen={isDoorOpen(24)} 
              onClick={() => handleDoorClick(24)} 
            />
          </Row>

          {/* Second layer - 2 doors */}
          <Row>
            <Door 
              id={22} 
              variant={getDoorVariant(22)} 
              isOpen={isDoorOpen(22)} 
              onClick={() => handleDoorClick(22)} 
            />
            <Door 
              id={23} 
              variant={getDoorVariant(23)} 
              isOpen={isDoorOpen(23)} 
              onClick={() => handleDoorClick(23)} 
            />
          </Row>

          {/* Third layer - 3 doors */}
          <Row>
            <Door 
              id={19} 
              variant={getDoorVariant(19)} 
              isOpen={isDoorOpen(19)} 
              onClick={() => handleDoorClick(19)} 
            />
            <Door 
              id={20} 
              variant={getDoorVariant(20)} 
              isOpen={isDoorOpen(20)} 
              onClick={() => handleDoorClick(20)} 
            />
            <Door 
              id={21} 
              variant={getDoorVariant(21)} 
              isOpen={isDoorOpen(21)} 
              onClick={() => handleDoorClick(21)} 
            />
          </Row>

          {/* Fourth layer - 4 doors */}
          <Row>
            <Door 
              id={15} 
              variant={getDoorVariant(15)} 
              isOpen={isDoorOpen(15)} 
              onClick={() => handleDoorClick(15)} 
            />
            <Door 
              id={16} 
              variant={getDoorVariant(16)} 
              isOpen={isDoorOpen(16)} 
              onClick={() => handleDoorClick(16)} 
            />
            <Door 
              id={17} 
              variant={getDoorVariant(17)} 
              isOpen={isDoorOpen(17)} 
              onClick={() => handleDoorClick(17)} 
            />
            <Door 
              id={18} 
              variant={getDoorVariant(18)} 
              isOpen={isDoorOpen(18)} 
              onClick={() => handleDoorClick(18)} 
            />
          </Row>

          {/* Fifth layer - 5 doors */}
          <Row>
            <Door 
              id={10} 
              variant={getDoorVariant(10)} 
              isOpen={isDoorOpen(10)} 
              onClick={() => handleDoorClick(10)} 
            />
            <Door 
              id={11} 
              variant={getDoorVariant(11)} 
              isOpen={isDoorOpen(11)} 
              onClick={() => handleDoorClick(11)} 
            />
            <Door 
              id={12} 
              variant={getDoorVariant(12)} 
              isOpen={isDoorOpen(12)} 
              onClick={() => handleDoorClick(12)} 
            />
            <Door 
              id={13} 
              variant={getDoorVariant(13)} 
              isOpen={isDoorOpen(13)} 
              onClick={() => handleDoorClick(13)} 
            />
            <Door 
              id={14} 
              variant={getDoorVariant(14)} 
              isOpen={isDoorOpen(14)} 
              onClick={() => handleDoorClick(14)} 
            />
          </Row>

          {/* Sixth layer - 6 doors */}
          <Row>
            <Door 
              id={4} 
              variant={getDoorVariant(4)} 
              isOpen={isDoorOpen(4)} 
              onClick={() => handleDoorClick(4)} 
            />
            <Door 
              id={5} 
              variant={getDoorVariant(5)} 
              isOpen={isDoorOpen(5)} 
              onClick={() => handleDoorClick(5)} 
            />
            <Door 
              id={6} 
              variant={getDoorVariant(6)} 
              isOpen={isDoorOpen(6)} 
              onClick={() => handleDoorClick(6)} 
            />
            <Door 
              id={7} 
              variant={getDoorVariant(7)} 
              isOpen={isDoorOpen(7)} 
              onClick={() => handleDoorClick(7)} 
            />
            <Door 
              id={8} 
              variant={getDoorVariant(8)} 
              isOpen={isDoorOpen(8)} 
              onClick={() => handleDoorClick(8)} 
            />
            <Door 
              id={9} 
              variant={getDoorVariant(9)} 
              isOpen={isDoorOpen(9)} 
              onClick={() => handleDoorClick(9)} 
            />
          </Row>

          {/* Trunk - 3 doors */}
          <div className="mt-4">
            <Row>
              <Door 
                id={1} 
                variant={getDoorVariant(1)} 
                isOpen={isDoorOpen(1)} 
                onClick={() => handleDoorClick(1)} 
              />
              <Door 
                id={2} 
                variant={getDoorVariant(2)} 
                isOpen={isDoorOpen(2)} 
                onClick={() => handleDoorClick(2)} 
              />
              <Door 
                id={3} 
                variant={getDoorVariant(3)} 
                isOpen={isDoorOpen(3)} 
                onClick={() => handleDoorClick(3)} 
              />
            </Row>
          </div>
        </section>

      </div>
    </main>
  );
}
