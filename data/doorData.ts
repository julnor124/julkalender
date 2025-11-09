import { DoorLayoutRow, DoorModel } from "@/models/door";

export const doorData: DoorModel[] = [
  {
    id: 1,
    title: "WORDLE",
    description:
      "Välkommen till julkalendern, tänk att jag löste en i år igen!",
    password: "test",
    gameSlug: "wordle",
    gameType: "wordle",
    wordleConfig: {
      solution: "glögg",
      maxGuesses: 6,
      instructions:
        "Gissa ordet, ni kan reglerna så KÖR",
    },
  },
  {
    id: 2,
    title: "Snöflingor",
    description:
      "Idag snöar det! Ser du snöflingorna som faller utanför fönstret?",
    password: "test",
    gameSlug: "game2",
    gameType: "content",
  },
  {
    id: 3,
    title: "Adventsljus",
    description:
      "Det första ljuset tänds idag. Ljuset växer för varje dag som går.",
    password: "test",
    gameSlug: "game3",
    gameType: "content",
  },
  {
    id: 4,
    title: "Pepparkakor",
    description:
      "Idag bakar vi pepparkakor! Doften av kanel och ingefära fyller huset.",
    password: "test",
    gameSlug: "game4",
    gameType: "content",
  },
  {
    id: 5,
    title: "Tomten kommer",
    description:
      "Tomten har börjat sin resa från Nordpolen. Han har mycket att göra!",
    password: "test",
    gameSlug: "game5",
    gameType: "content",
  },
  {
    id: 6,
    title: "Julgranen",
    description:
      "Idag väljer vi ut den perfekta granen. Vilken blir vår favorit?",
    password: "test",
    gameSlug: "game6",
    gameType: "content",
  },
  {
    id: 7,
    title: "Julstjärna",
    description:
      "Stjärnan på toppen av granen lyser klart. Den visar vägen hem.",
    password: "test",
    gameSlug: "game7",
    gameType: "content",
  },
  {
    id: 8,
    title: "Julklappar",
    description:
      "Det är dags att börja paketera julklappar. Vilken present ska du ge?",
    password: "test",
    gameSlug: "game8",
    gameType: "content",
  },
  {
    id: 9,
    title: "Julsånger",
    description:
      "Idag sjunger vi julsånger tillsammans. Vilken är din favorit?",
    password: "test",
    gameSlug: "game9",
    gameType: "content",
  },
  {
    id: 10,
    title: "Andra ljuset",
    description: "Det andra adventsljuset tänds. Ljuset växer starkare.",
    password: "test",
    gameSlug: "game10",
    gameType: "content",
  },
  {
    id: 11,
    title: "Julbak",
    description: "Idag bakar vi alla sorters julbak. Doften är fantastisk!",
    password: "test",
    gameSlug: "game11",
    gameType: "content",
  },
  {
    id: 12,
    title: "Lucia",
    description: "Lucia kommer med ljus i mörkret. Hon välsignar oss alla.",
    password: "test",
    gameSlug: "game12",
    gameType: "content",
  },
  {
    id: 13,
    title: "Julens djur",
    description:
      "Renen hjälper tomten att flyga. De har mycket att göra denna natt.",
    password: "test",
    gameSlug: "game13",
    gameType: "content",
  },
  {
    id: 14,
    title: "Tredje ljuset",
    description: "Det tredje ljuset tänds. Snart är det jul!",
    password: "test",
    gameSlug: "game14",
    gameType: "content",
  },
  {
    id: 15,
    title: "Snöbollskrig",
    description: "Idag har vi snöbollskrig! Vem vinner denna gång?",
    password: "test",
    gameSlug: "game15",
    gameType: "content",
  },
  {
    id: 16,
    title: "Julmarknad",
    description: "Vi går till julmarknaden och köper glögg och pepparkakor.",
    password: "test",
    gameSlug: "game16",
    gameType: "content",
  },
  {
    id: 17,
    title: "Granpynt",
    description: "Idag pyntar vi granen med alla våra favoritprylar.",
    password: "test",
    gameSlug: "game17",
    gameType: "content",
  },
  {
    id: 18,
    title: "Fjärde ljuset",
    description: "Det fjärde och sista ljuset tänds. Nu är det snart jul!",
    password: "test",
    gameSlug: "game18",
    gameType: "content",
  },
  {
    id: 19,
    title: "Tomtens verkstad",
    description:
      "Tomten arbetar hårt i sin verkstad. Alla leksaker måste bli klara.",
    password: "test",
    gameSlug: "game19",
    gameType: "content",
  },
  {
    id: 20,
    title: "Julbord",
    description: "Idag dukar vi julbordet med allt det goda vi har.",
    password: "test",
    gameSlug: "game20",
    gameType: "content",
  },
  {
    id: 21,
    title: "Årets längsta natt",
    description:
      "Det är årets längsta natt. Imorgon blir dagarna längre igen.",
    password: "test",
    gameSlug: "game21",
    gameType: "content",
  },
  {
    id: 22,
    title: "Julklappar under granen",
    description:
      "Julklapparna ligger under granen. Snart får vi öppna dem!",
    password: "test",
    gameSlug: "game22",
    gameType: "content",
  },
  {
    id: 23,
    title: "Julafton",
    description:
      "Det är julafton! Tomten kommer i natt med alla julklappar.",
    password: "test",
    gameSlug: "game23",
    gameType: "content",
  },
  {
    id: 24,
    title: "Juldagen",
    description:
      "God jul! Idag firade vi jul tillsammans. Det är den bästa dagen på året!",
    password: "test",
    gameSlug: "game24",
    gameType: "content",
  },
];

export const doorLayout: DoorLayoutRow[] = [
  { doorIds: [24] },
  { doorIds: [22, 23] },
  { doorIds: [19, 20, 21] },
  { doorIds: [15, 16, 17, 18] },
  { doorIds: [10, 11, 12, 13, 14] },
  { doorIds: [4, 5, 6, 7, 8, 9] },
  { doorIds: [1, 2, 3] },
];

