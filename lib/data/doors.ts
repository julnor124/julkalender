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
    title: "Adventsljus",
    content: "Det första ljuset tänds idag. Ljuset växer för varje dag som går."
  },
  {
    id: 4,
    title: "Pepparkakor",
    content: "Idag bakar vi pepparkakor! Doften av kanel och ingefära fyller huset."
  },
  {
    id: 5,
    title: "Tomten kommer",
    content: "Tomten har börjat sin resa från Nordpolen. Han har mycket att göra!"
  },
  {
    id: 6,
    title: "Julgranen",
    content: "Idag väljer vi ut den perfekta granen. Vilken blir vår favorit?"
  },
  {
    id: 7,
    title: "Julstjärna",
    content: "Stjärnan på toppen av granen lyser klart. Den visar vägen hem."
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
    title: "Lucia",
    content: "Lucia kommer med ljus i mörkret. Hon välsignar oss alla."
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
    title: "Tomtens verkstad",
    content: "Tomten arbetar hårt i sin verkstad. Alla leksaker måste bli klara."
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
