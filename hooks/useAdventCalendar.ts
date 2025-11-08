import { useState, useCallback } from 'react';

export interface Door {
  id: number;
  isOpen: boolean;
  variant: 'green' | 'trunk';
}

export const useAdventCalendar = () => {
  const [openDoors, setOpenDoors] = useState<Set<number>>(new Set());

  const toggleDoor = useCallback((doorId: number) => {
    setOpenDoors(prev => {
      const newSet = new Set(prev);
      if (newSet.has(doorId)) {
        newSet.delete(doorId);
      } else {
        newSet.add(doorId);
      }
      return newSet;
    });
  }, []);

  const isDoorOpen = useCallback((doorId: number) => {
    return openDoors.has(doorId);
  }, [openDoors]);

  const getDoorVariant = useCallback((doorId: number): 'green' | 'trunk' => {
    // Doors 1-3 are trunk (bottom row)
    return doorId <= 3 ? 'trunk' : 'green';
  }, []);

  return {
    openDoors,
    toggleDoor,
    isDoorOpen,
    getDoorVariant,
  };
};
