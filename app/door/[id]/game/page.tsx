import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoorById } from "@/lib/data/doors";

interface DoorGamePageProps {
  params: {
    id: string;
  };
}

export default function DoorGamePage({ params }: DoorGamePageProps) {
  const doorId = Number.parseInt(params.id, 10);

  if (Number.isNaN(doorId)) {
    notFound();
  }

  const door = getDoorById(doorId);

  if (!door) {
    notFound();
  }

  const isDoorTen = doorId === 10;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b33] via-[#1c0d52] to-[#26006f] text-[#fdf7f7] font-festive">
      <div className="snow pointer-events-none" />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center px-4 pb-24 pt-16">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl text-[#F9DADA] drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
            Lucka {doorId}: {door.title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-[#F9DADA]/80 max-w-2xl mx-auto">
            {door.content}
          </p>
        </header>

        <section className="w-full rounded-2xl bg-white/10 p-8 text-center shadow-xl backdrop-blur">
          {isDoorTen ? (
            <div className="space-y-4">
              <h2 className="text-2xl text-[#ffe89c]">Dagens spel kommer snart!</h2>
              <p className="text-[#F9DADA]/85">
                Vi arbetar på ett musikspel för lucka 10. Håll ögonen öppna – snart kan du spela det här.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl text-[#ffe89c]">Spelområde för lucka {doorId}</h2>
              <p className="text-[#F9DADA]/80">
                Här kommer spelet eller aktiviteten för den här luckan att visas. Under tiden kan du gå
                tillbaka och öppna fler luckor.
              </p>
            </div>
          )}
        </section>

        <Link
          href="/"
          className="mt-12 rounded-full bg-[#ffe89c] px-6 py-2 text-[#311066] font-semibold transition hover:bg-[#ffd45c]"
        >
          Tillbaka till kalendern
        </Link>
      </main>
    </div>
  );
}

