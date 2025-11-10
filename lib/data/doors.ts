export interface DoorData {
  id: number;
  title: string;
  content: string;
}

export const doorsData: DoorData[] = [
  {
    id: 1,
    title: "WORDLE",
    content: "Välkommen till julkalendern! Här börjar den magiska resan mot jul."
  },
  {
    id: 2,
    title: "Snöflingor",
    content: "Idag snöar det! Ser du snöflingorna som faller utanför fönstret?"
  },
  {
    id: 3,
    title: "Pixelstjärnan",
    content:
      "Den pixliga siluetten hör hemma på scen. Kan du lista ut vem det är innan bilden avslöjas?"
  },
  {
    id: 4,
    title: "Connections",
    content: "Fyra grupper gömmer sig bland sexton ord. Kan du hitta alla innan gissningarna tar slut?"
  },
  {
    id: 5,
    title: "Heardle",
    content: "Gissa låten på sex försök – varje skip avslöjar lite mer av introt."
  },
  {
    id: 6,
    title: "På spåret",
    content: "Fem ledtrådar, sex försök. Dra i nödbromsen när du vet vilken stad vi ska till!"
  },
  {
    id: 7,
    title: "Rebus",
    content: "Gissa adventsuttrycket genom att tolka emojirebusen."
  },
  {
    id: 8,
    title: "Gissa flaggan",
    content:
      "Flaggan är nästan gömd! Varje gissning avslöjar lite mer – kan du pricka Fiji innan allt syns?"
  },
  {
    id: 9,
    title: "På spåret – Rihanna",
    content:
      "Från Barbados sand till Super Bowl-höjder – lista ut vilken superstjärna vi jagar innan tågresan är slut."
  },
  {
    id: 10,
    title: "Quizkväll",
    content:
      "Tio frågor om Sverige, jul och popkultur väntar bakom luckan – hur många klarar du?"
  },
  {
    id: 11,
    title: "Pixlad filmkväll",
    content:
      "Pixlarna avslöjar långsamt en ikonisk filmklassiker. Kan du se vilken det är innan bilden blir skarp?"
  },
  {
    id: 12,
    title: "Musikfredag",
    content: "Gissa vilken ikonisk låt som gömmer sig bakom luckan – varje skip avslöjar mer av introt."
  },
  {
    id: 13,
    title: "Julens djur",
    content: "Renen hjälper tomten att flyga. De har mycket att göra denna natt."
  },
  {
    id: 14,
    title: "Tredje ljuset",
    content: "Det tredje ljuset tänds. Snart är det jul!"
  },
  {
    id: 15,
    title: "Musikconnections",
    content:
      "Fyra grupper av låtar väntar – kan du koppla ihop filmhits, djurlåtar, debutsinglar och Eurovisionvinnare innan gissningarna tar slut?"
  },
  {
    id: 16,
    title: "Julmarknad",
    content: "Vi går till julmarknaden och köper glögg och pepparkakor."
  },
  {
    id: 17,
    title: "Granpynt",
    content: "Idag pyntar vi granen med alla våra favoritprylar."
  },
  {
    id: 18,
    title: "Fjärde ljuset",
    content: "Det fjärde och sista ljuset tänds. Nu är det snart jul!"
  },
  {
    id: 19,
    title: "Musikfredag",
    content: "Fredag igen! Nynna med, skippa för mer och försök gissa låten."
  },
  {
    id: 20,
    title: "Julbord",
    content: "Idag dukar vi julbordet med allt det goda vi har."
  },
  {
    id: 21,
    title: "Årets längsta natt",
    content: "Det är årets längsta natt. Imorgon blir dagarna längre igen."
  },
  {
    id: 22,
    title: "Julklappar under granen",
    content: "Julklapparna ligger under granen. Snart får vi öppna dem!"
  },
  {
    id: 23,
    title: "Julafton",
    content: "Det är julafton! Tomten kommer i natt med alla julklappar."
  },
  {
    id: 24,
    title: "Juldagen",
    content: "God jul! Idag firade vi jul tillsammans. Det är den bästa dagen på året!"
  }
];

export const getDoorById = (id: number): DoorData | undefined => {
  return doorsData.find(door => door.id === id);
};
