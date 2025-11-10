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
    connectionsConfig: {
      groups: [
        {
          id: "umea",
          title: "Kändisar från Umeå",
          description: "William Spetz · Tove Styrke · Mikael Lustig · Hanna Ljungberg",
          words: ["William Spetz", "Tove Styrke", "Mikael Lustig", "Hanna Ljungberg"],
        },
        {
          id: "tandettljus",
          title: "Textrader från ”Tänd ett ljus”",
          description: "Dom dom dom · Låt aldrig hoppet försvinna · Fred på jorden · Samma himmel",
          words: ["Dom dom dom", "Låt aldrig hoppet försvinna", "Fred på jorden", "Samma himmel"],
        },
        {
          id: "hatlag",
          title: "Lag Julia hatar!!!",
          description: "Guif · Djurgården · Modo · Skellefteå",
          words: ["Guif", "Djurgården", "Modo", "Skellefteå"],
        },
        {
          id: "favoritlag",
          title: "Lag Julia gillar <3",
          description: "Björklöven · Liverpool · Sandvik · Holmsund City",
          words: ["Björklöven", "Liverpool", "Sandvik", "Holmsund City"],
        },
      ],
    },
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
      "",
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
    title: "LUCKA 8: Gissa flaggan",
    description:
      "Kan du se vilket land det är på bara en glimt av flaggan? Varje gissning avslöjar lite mer!",
    password: "test",
    gameSlug: "gissa-flaggan",
    gameType: "flag",
    flagGuessConfig: {
      image: "/images/fiji.svg",
      solution: "Fiji",
      acceptedAnswers: ["Fiji", "Republic of Fiji", "Fiji Islands"],
    },
  },
  {
    id: 9,
    title: "LUCKA 9: På spåret – ARTIST",
    description:
      "Följ ledtrådarna och lista ut vilken superstjärna vi är på väg mot!",
    password: "test",
    gameSlug: "pa-sparet-rihanna",
    gameType: "on-the-track",
    onTheTrackConfig: {
      answer: "Rihanna",
      acceptedAnswers: ["Rihanna", "Robyn Rihanna Fenty", "Robyn Fenty"],
      videoUrl: "https://www.youtube-nocookie.com/embed/CvBfHwUxHIk?autoplay=1&start=0",
      levels: [
        {
          points: 10,
          image: "/images/barbados10p.jpg",
          clue:
            "Vi söker en person vars första hem ligger öster om Karibien och vars barndomsadress senare blev pilgrimsplats för fans. Personen sjöng tidigt i skolans kör men drömde sig ut mot större scener och när andra byggde sandslott byggde denna ett globalt varumärke.",
        },
        {
          points: 8,
          image: "/images/superbowl8p.jpg",
          clue:
            "Nio nummer-ett-hits på Billboard hittills, och uppträdde på Super Bowl – medan hen visade upp något mer än bara sin röst.",
        },
        {
          points: 6,
          image: "/images/fenty6p.jpg",
          clue:
            "När personen var femton fick hen chansen att sjunga för en amerikansk producent och världen fick snart höra en paraplysång som aldrig tog slut. ☂️ Idag finns även ett skönhetsmärke som revolutionerade branschen.",
        },
        {
          points: 4,
          image: "/images/diamonds4p.jpg",
          clue:
            "Personen sjunger om diamonds, work och att bitch better have my money. Från popprinsessa till modeikon och miljardär, men släpper hellre smink än nya låtar.",
        },
        {
          points: 2,
          image: "/images/umbrella2p.jpg",
          clue:
            "Denna kvinna kommer från Barbados, heter Robyn Fenty, och är världens mest lysande stjärna under paraplyet. ☂️ Vem är vi på väg mot?",
        },
      ],
    },
  },
  {
    id: 10,
    title: "LUCKA 10: Quizdag",
    description:
      "Idag är det quiiiizzz!!! Vem vinner???",
    password: "test",
    gameSlug: "quizkvall",
    gameType: "trivia-quiz",
    triviaQuizConfig: {
      questions: [
        {
          question: "Vilket år invigdes Globen (nu Avicii Arena) i Stockholm?",
          options: ["1989", "1992", "1986", "1995"],
          correctOption: 0,
        },
        {
          question: "Vad heter Sveriges största sjö?",
          options: ["Vänern", "Vättern", "Mälaren", "Hjälmaren"],
          correctOption: 0,
        },
        {
          question: "Vilket land har flest invånare?",
          options: ["Kina", "USA", "Indonesien", "Indien"],
          correctOption: 3,
        },
        {
          question: "Vad heter den ikoniska nattklubben i Berlin?",
          options: ["Tresor", "KitKatClub", "Watergate", "Berghain"],
          correctOption: 3,
        },
        {
          question: "Vilka är Nya Zeelands urinvånare?",
          options: [
            "Aboriginer",
            "Māori",
            "Inuiter",
            "Zulu",
          ],
          correctOption: 1,
        },
        {
          question: "Vilken krydda ger glöggen sin karakteristiska doft tillsammans med kanel?",
          options: ["Nejlika", "Rosmarin", "Timjan", "Vanilj"],
          correctOption: 0,
        },
        {
          question: "Vilken är den mest streamade svenskspråkiga låten på Spotify?",
          options: ["Säg mig- Carola och Zara Larsson", "Svag- Victor Leksell", "Jag Kommer- Veronica Maggio", "Boten Anna- Basshunter"],
          correctOption: 1,
        },
        {
          question: "Vilken svensk stad kallas ofta för “Lilla London”?",
          options: ["Malmö", "Göteborg", "Uppsala", "Örebro"],
          correctOption: 1,
        },
        {
          question: "Vad heter Japans högsta berg?",
          options: ["Mount Everest", "Mount Fuji", "Mount Takao", "Mount Koya"],
          correctOption: 1,          
        },
        {
          question: "Vilken planet ligger närmast solen?",
          options: ["Mars", "Venus", "Jorden", "Merkurius"],
          correctOption: 3,
        },
      ],
    },
  },
  {
    id: 11,
    title: "LUCKA 11: Pixlad filmkväll",
    description:
      "Linslus i pixlar! Gissa vilken klassisk film som döljer sig bakom rutor som sakta skärps.",
    password: "test",
    gameSlug: "pixlad-film",
    gameType: "pixel-movie",
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
    title: "LUCKA 15: Musikconnections",
    description:
      "Hitta grupper av fyra, idag är det musiktema!",
    password: "test",
    gameSlug: "musikconnections",
    gameType: "connections",
    connectionsConfig: {
      groups: [
        {
          id: "filmSongs",
          title: "Låtar som varit med i filmer",
          description:
            "Love Me Like You Do (Fifty Shades of Grey) · (I've Had) The Time of My Life (Dirty Dancing) · Never Say Never (Karate Kid) · From Russia with Love (James Bond)",
          words: [
            "Love Me Like You Do",
            "(I've Had) The Time of My Life",
            "Never Say Never",
            "From Russia with Love",
          ],
        },
        {
          id: "animalTitles",
          title: "Låtar med djur i titeln",
          description:
            "Eye of the Tiger (Survivor) · Black Dog (Led Zeppelin) · Buffalo Soldier (Bob Marley & The Wailers) · I Am the Walrus (The Beatles)",
          words: ["Eye of the Tiger", "Black Dog", "Buffalo Soldier", "I Am the Walrus"],
        },
        {
          id: "debutSingles",
          title: "Debutsinglar av stora artister",
          description:
            "...Baby One More Time (Britney Spears) · Ocean Eyes (Billie Eilish) · One Time (Justin Bieber) · Blinded by the Light (Bruce Springsteen)",
          words: ["...Baby One More Time", "Ocean Eyes", "One Time", "Blinded by the Light"],
        },
        {
          id: "eurovisionWinners",
          title: "Eurovisionvinnare",
          description:
            "Arcade (Nederländerna 2019) · Wild Dances (Ukraina 2004) · Ne partez pas sans moi (Schweiz 1988) · What's Another Year (Irland 1980)",
          words: ["Arcade", "Wild Dances", "Ne partez pas sans moi", "What's Another Year"],
        },
      ],
    },
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
      "Fredagsfeeling igen! Klarar du att gissa låten?",
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

