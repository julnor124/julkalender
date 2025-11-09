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
    title: "Lucka 2: Minikorsord",
    description:
      "Tips: Klicka på en ledtråd för att hoppa till ordet. En miniruta kommer poppa upp när du fyllt i allt och säga om du har rätt eller fel",
    password: "test",
    gameSlug: "crossword",
    gameType: "crossword",
    crosswordConfig: {
      rows: 7,
      cols: 9,
      entries: [
        {
          id: "1A",
          number: 1,
          clue: "Kort ord för högtiden i december",
          answer: "JUL",
          row: 0,
          col: 4,
          direction: "across",
        },
        {
          id: "2A",
          number: 2,
          clue: "Det lyser i fönstren denna tid",
          answer: "LJUS",
          row: 1,
          col: 2,
          direction: "across",
        },
        {
          id: "3A",
          number: 3,
          clue: "Första delen i ordet för saffransbulle",
          answer: "LUSSE",
          row: 2,
          col: 4,
          direction: "across",
        },
        {
          id: "4A",
          number: 4,
          clue: "Kryddig dryck som värmer i december",
          answer: "GLÖGG",
          row: 3,
          col: 0,
          direction: "across",
        },
        {
          id: "5A",
          number: 5,
          clue: "Basen i gröten på julafton",
          answer: "RIS",
          row: 4,
          col: 4,
          direction: "across",
        },
        {
          id: "6A",
          number: 6,
          clue: "Den pyntade vännen i vardagsrummet",
          answer: "GRAN",
          row: 5,
          col: 2,
          direction: "across",
        },
        {
          id: "7A",
          number: 7,
          clue: "När tomten smyger över taken",
          answer: "NATT",
          row: 6,
          col: 4,
          direction: "across",
        },
        {
          id: "8D",
          number: 8,
          clue: "Hög och klädd i glitter",
          answer: "JULGRAN",
          row: 0,
          col: 4,
          direction: "down",
        },
      ],
    },
  },
  {
    id: 3,
    title: "Pixelstjärnan",
    description:
      "Den pixliga siluetten hör hemma på scen. Avslöja vem det är innan gissningarna tar slut!",
    password: "test",
    gameSlug: "pixel",
    gameType: "pixel",
  },
  {
    id: 4,
    title: "LUCKA 4: Connections",
    description:
      "Hitta fyra grupper med fyra ord vardera. Du har fyra gissningar – men om du är nära får du höra det!",
    password: "test",
    gameSlug: "connections",
    gameType: "connections",
  },
  {
    id: 5,
    title: "LUCKA 5: MUSIKFREDAG",
    description:
      "Lyssna på några sekunder i taget och gissa låten. Skippa för att höra mer – men du får bara sex försök!",
    password: "test",
    gameSlug: "heardle",
    gameType: "heardle",
    heardleConfig: {
      audioSrc: "/audio/pokerface.mp4",
      revealDurations: [2, 1, 2, 3, 4, 5],
      solution: "Poker Face",
      artist: "Lady Gaga",
      acceptedAnswers: ["Poker Face", "Pokerface"],
      videoUrl: "https://www.youtube-nocookie.com/embed/bESGLojNYSo?autoplay=1&start=0",
    },
  },
  {
    id: 6,
    title: "LUCKA 6: På spåret",
    description:
      "Hoppa på tåget! Läs ledtrådarna, dra i nödbromsen när du vet svaret och se hur många poäng du tar den på.",
    password: "test",
    gameSlug: "pa-sparet",
    gameType: "on-the-track",
    onTheTrackConfig: {
      answer: "Orlando",
      acceptedAnswers: ["Orlando"],
      levels: [
        {
          points: 10,
          image: "/images/orl10p.png",
          clue:
            "Vi lämnar befäst stad i söder vars initialer initierar även region vars femte stad vi tar sikte på. På vår resa norrut passerar vi strand på strand innan vi når vår kustlösa stad med stor attraktionskraft.",
        },
        {
          points: 8,
          image: "/images/orl8p.png",
          clue:
            "Kunskaper om USA:s 35:e president är meriterande då denna spacade information leder er till grannstaden 8 mil öster om vår orangea stad med stort golfintresse.",
        },
        {
          points: 6,
          image: "/images/orl6p.png",
          clue:
            "Jurassic Park, E.T. och King Kong är universala filmreferenser av helt annan karaktär än alven från Mörkmården men samtliga leder till staden där både Rwanda och Rumänien är centrala begrepp.",
        },
        {
          points: 4,
          image: "/images/orl4p.png",
          clue:
            "Begagnade golfbollar och puch-modell för tankarna till vår stat i sydöst och byter du flankerande a:n mot o:n i blågul flygplats har du landat rätt.",
        },
        {
          points: 2,
          image: "/images/orl2p.png",
          clue:
            "Disney World, SeaWorld och Universal Studios lockar alla turister till denna Floridastad på O.",
        },
      ],
    },
  },
  {
    id: 7,
    title: "LUCKA 7: Rebus",
    description:
      "Kan du lista ut rebusen?",
    password: "test",
    gameSlug: "rebus",
    gameType: "rebus",
    rebusConfig: {
      prompt:
        "1️⃣ + 🕯️ + ✝️ + 🕯️ + 🌅",
      solution: "Första advent",
      acceptedAnswers: ["Första advent", "Forsta advent", "1:a advent", "Först advent"],
    },
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
    title: "LUCKA 12: Musikfredag",
    description:
      "Det är fredag! Lyssna på några sekunder i taget och gissa låten. Skippa för att höra mer – men du får bara sex försök!",
    password: "test",
    gameSlug: "musikafton",
    gameType: "heardle",
    heardleConfig: {
      audioSrc: "/audio/dirtydiana.mp4",
      revealDurations: [2, 1, 2, 3, 4, 5],
      solution: "Dirty Diana",
      artist: "Michael Jackson",
      acceptedAnswers: ["Dirty Diana"],
      videoUrl: "https://www.youtube-nocookie.com/embed/yUi_S6YWjZw?autoplay=1&start=0",
    },
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
    title: "LUCKA 19: Musikfredag",
    description:
      "Fredagsfeeling igen! Klarar du att gissa låten innan refrängen dyker upp?",
    password: "test",
    gameSlug: "musikfredag",
    gameType: "heardle",
    heardleConfig: {
      audioSrc: "/audio/layallyourloveonme.mp4",
      revealDurations: [2, 1, 2, 3, 4, 5],
      solution: "Lay All Your Love on Me",
      artist: "ABBA",
      acceptedAnswers: ["Lay All Your Love on Me", "Lay All Your Love On Me"],
      videoUrl: "https://www.youtube-nocookie.com/embed/ulZQTrV8QlQ?autoplay=1&start=0",
    },
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

