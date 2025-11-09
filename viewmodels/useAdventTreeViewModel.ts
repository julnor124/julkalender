"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { doorService } from "@/services/doorService";
import { DoorModel } from "@/models/door";

export const useAdventTreeViewModel = () => {
  const router = useRouter();

  const layout = useMemo(() => doorService.getLayout(), []);
  const doorMap = useMemo(() => {
    const map = new Map<number, DoorModel>();
    doorService.getAllDoors().forEach((door) => {
      map.set(door.id, door);
    });
    return map;
  }, []);

  const rows = useMemo(() => {
    return layout.map((row) =>
      row.doorIds
        .map((doorId) => doorMap.get(doorId))
        .filter((door): door is DoorModel => Boolean(door))
    );
  }, [layout, doorMap]);

  const handleDoorClick = useCallback(
    (doorId: number) => {
      router.push(`/door/${doorId}`);
    },
    [router]
  );

  const getDoorVariant = useCallback(
    (doorId: number): "green" | "trunk" => doorService.getDoorVariant(doorId),
    []
  );

  return {
    rows,
    handleDoorClick,
    getDoorVariant,
  };
};

