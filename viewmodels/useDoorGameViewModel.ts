"use client";

import { useMemo } from "react";
import { DoorModel } from "@/models/door";

export const useDoorContentViewModel = (door: DoorModel) => {
  return useMemo(
    () => ({
      title: `Lucka ${door.id}: ${door.title}`,
      description: door.description,
    }),
    [door.description, door.id, door.title]
  );
};

