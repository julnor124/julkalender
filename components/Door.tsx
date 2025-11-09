"use client";

import type { FC } from "react";

export interface DoorProps {
  id: number;
  variant: "green" | "trunk";
  onClick: () => void;
}

const Door: FC<DoorProps> = ({ id, variant, onClick }) => {
  const baseClasses = `
    relative flex items-center justify-center select-none 
    rounded-lg cursor-pointer transition-all duration-300 hover:scale-105
  `;

  const getVariantClasses = () => {
    const green = "bg-[radial-gradient(circle_at_50%_40%,#1EDB25_0%,#27862A_100%)]";
    const trunk = "bg-[radial-gradient(circle_at_50%_40%,#B78383_0%,#6A4343_100%)]";
    
    return variant === 'green' ? green : trunk;
  };

  return (
    <div 
      className={`${baseClasses} ${getVariantClasses()}`} 
      style={{
        width: "var(--door-size, 80px)",
        height: "var(--door-size, 80px)",
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <span
        className="text-center font-bold text-black"
        style={{ fontSize: "calc(var(--door-size, 80px) * 0.3)" }}
      >
        {id}
      </span>
    </div>
  );
};

export default Door;
