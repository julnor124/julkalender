"use client";

import React from 'react';

export interface DoorProps {
  id: number;
  variant: 'green' | 'trunk';
  isOpen: boolean;
  onClick: () => void;
}

const Door: React.FC<DoorProps> = ({ id, variant, isOpen, onClick }) => {
  const baseClasses = `
    relative flex items-center justify-center select-none 
    w-[80px] h-[80px] rounded-lg cursor-pointer transition-all duration-300 hover:scale-105
  `;

  const getVariantClasses = () => {
    const green = "bg-[radial-gradient(circle_at_50%_40%,#1EDB25_0%,#27862A_100%)]";
    const trunk = "bg-[radial-gradient(circle_at_50%_40%,#B78383_0%,#6A4343_100%)]";
    
    return variant === 'green' ? green : trunk;
  };

  return (
    <div 
      className={`${baseClasses} ${getVariantClasses()}`} 
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
      <span className="text-center text-sm font-bold text-black">
        {id}
      </span>
    </div>
  );
};

export default Door;
