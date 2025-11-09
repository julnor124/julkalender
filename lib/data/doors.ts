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
    title: "Julklappar",
    content: "Det är dags att börja paketera julklappar. Vilken present ska du ge?"
  },
  {
    id: 9,
    title: "Julsånger",
    content: "Idag sjunger vi julsånger tillsammans. Vilken är din favorit?"
  },
  {
    id: 10,
    title: "Andra ljuset",
    content: "Det andra adventsljuset tänds. Ljuset växer starkare."
  },
  {
    id: 11,
    title: "Julbak",
    content: "Idag bakar vi alla sorters julbak. Doften är fantastisk!"
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
    title: "Snöbollskrig",
    content: "Idag har vi snöbollskrig! Vem vinner denna gång?"
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
    content: "Fredag igen! Nynna med, skippa för mer och försök gissa låten innan refrängen."
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
