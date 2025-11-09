import { notFound } from "next/navigation";
import { doorService } from "@/services/doorService";
import { DoorGameView } from "@/components/door/DoorGameView";

interface DoorGamePageProps {
  params: {
    id: string;
    gameSlug: string;
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return doorService.getAllDoors().map((door) => ({
    id: door.id.toString(),
    gameSlug: door.gameSlug,
  }));
}

export default function DoorGamePage({ params }: DoorGamePageProps) {
  const doorId = Number.parseInt(params.id, 10);

  if (Number.isNaN(doorId)) {
    notFound();
  }

  const door = doorService.getDoorBySlug(doorId, params.gameSlug);

  if (!door) {
    notFound();
  }

  return <DoorGameView door={door} />;
}

