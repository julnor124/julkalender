import { doorData, doorLayout } from "@/data/doorData";
import { DoorLayoutRow, DoorModel } from "@/models/door";

export const doorService = {
  getAllDoors(): DoorModel[] {
    return doorData;
  },

  getDoorById(id: number): DoorModel | undefined {
    return doorData.find((door) => door.id === id);
  },

  getDoorBySlug(id: number, gameSlug: string): DoorModel | undefined {
    return doorData.find(
      (door) =>
        door.id === id && door.gameSlug.toLowerCase() === gameSlug.toLowerCase()
    );
  },

  getLayout(): DoorLayoutRow[] {
    return doorLayout;
  },

  getDoorVariant(id: number): "green" | "trunk" {
    return id <= 3 ? "trunk" : "green";
  },
};

