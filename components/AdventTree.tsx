"use client";

import { FC, useMemo } from "react";
import type { CSSProperties, ReactNode } from "react";
import Door from "@/components/Door";
import { useAdventTreeViewModel } from "@/viewmodels/useAdventTreeViewModel";

interface RowProps {
  children: ReactNode;
  className?: string;
}

const Row: FC<RowProps> = ({ children, className = "" }) => (
  <div
    className={`flex items-center justify-center ${className}`}
    style={{ gap: "var(--door-gap)" }}
  >
    {children}
  </div>
);

export default function AdventTreePage() {
  const { rows, handleDoorClick, getDoorVariant } =
    useAdventTreeViewModel();

  const treeStyle = useMemo(
    () =>
      ({
        "--door-size": "clamp(48px, min(8vw, 11vh), 220px)",
        "--door-gap": "0px",
      }) as CSSProperties,
    []
  );

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#17152D] to-[#532BDC] text-white">
      <div aria-hidden className="snow" />

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center px-4 py-6">
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-8">
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

          <section
            className="advent-tree flex flex-col items-center justify-start"
            style={treeStyle}
          >
            {rows.map((row, rowIndex) => (
              <Row
                key={rowIndex}
                className={rowIndex === rows.length - 1 ? "mt-[calc(var(--door-gap)*1.5)]" : ""}
              >
                {row.map((door) => (
                  <Door
                    key={door.id}
                    id={door.id}
                    variant={getDoorVariant(door.id)}
                    onClick={() => handleDoorClick(door.id)}
                  />
                ))}
              </Row>
            ))}
          </section>
        </div>
      </div>

      {/* 🎅 Animated Santa Claus at the bottom */}
      <div className="santa-container">
        <ul className="santa-wrapper">
          <li className="hohoho">
            <h2></h2>
            <h2></h2>
            <h2></h2>
          </li>
          <li className="santaclaus">
            <div className="chapeu">
              <div className="cone-2"></div>
              <div className="cone-1"></div>
            </div>
            <div className="face">
              <div className="eyes"></div>
              <div className="nariz"></div>
              <div className="barba">
                <div className="boca"></div>
              </div>
            </div>
            <div className="orelhas"></div>
          </li>
          <li className="hohoho">
            <h2></h2>
            <h2></h2>
            <h2></h2>
          </li>
        </ul>
      </div>
    </main>
  );
}
