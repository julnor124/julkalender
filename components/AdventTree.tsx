"use client";

import React from "react";
import { useAdventCalendar } from "@/hooks/useAdventCalendar";
import Door from "@/components/Door";

const Row: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`flex items-center justify-center ${className}`}
    style={{ gap: "var(--door-gap)" }}
  >
    {children}
  </div>
);

export default function AdventTreePage() {
  const { isDoorOpen, getDoorVariant } = useAdventCalendar();

  const handleDoorClick = (doorNumber: number) => {
    window.location.href = `/door/${doorNumber}`;
  };

  const treeStyle = React.useMemo(
    () =>
      ({
        "--door-size": "clamp(48px, min(8vw, 11vh), 220px)",
        "--door-gap": "0px",
      }) as React.CSSProperties,
    []
  );

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#17152D] to-[#532BDC] text-white">
      {/* Snow */}
      <div aria-hidden className="snow" />

      {/* Layout: heading plus tree centered together */}
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center px-4 py-6">
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-8">
          {/* Heading */}
          <div className="flex flex-col items-center justify-center gap-1">
            <h1
              className="text-center font-festive text-3xl leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] md:text-4xl"
              style={{ color: "#F9DADA" }}
            >
              JULKALENDER
            </h1>
            <span
              className="font-festive text-xl md:text-2xl"
              style={{ color: "#F9DADA" }}
            >
              2025
            </span>
          </div>

          {/* 🎄 Tree */}
          <section
            className="advent-tree flex flex-col items-center justify-start"
            style={treeStyle}
          >
            {/* Row 1 */}
            <Row>
              <Door
                id={24}
                variant={getDoorVariant(24)}
                isOpen={isDoorOpen(24)}
                onClick={() => handleDoorClick(24)}
              />
            </Row>

            {/* Row 2 */}
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

            {/* Row 3 */}
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

            {/* Row 4 */}
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

            {/* Row 5 */}
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

            {/* Row 6 */}
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

            {/* Trunk */}
            <Row className="mt-[calc(var(--door-gap)*1.5)]">
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
          </section>
        </div>
      </div>
    </main>
  );
}
