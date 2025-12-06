import { DoorLayoutRow, DoorModel } from "@/models/door";

export const doorData: DoorModel[] = [
  {
    id: 1,
    title: "WORDLE",
    description:
      "Välkommen till julkalendern, tänk att jag löste en i år igen!",
    password: "jagkaninteförståattjagpalladeiårigen",
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
    password: "ennydag",
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
    password: "star",
    gameSlug: "pixel",
    gameType: "pixel",
  },
  {
    id: 4,
    title: "LUCKA 4: Connections",
    description:
      "Hitta fyra grupper med fyra ord vardera. För bättre förklaring tryck HÄR",
    password: "tjena",
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
    password: "anotherone",
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
    password: "hejhopp",
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
    password: "busig",
    gameSlug: "rebus",
    gameType: "rebus",
    rebusConfig: {
      prompt:
        "🕯️ 🕯️+ ✝️ + 🌅",
      solution: "Andra advent",
      acceptedAnswers: ["Andra advent", "2:a advent","2a advent"],
    },
  },
  {
    id: 8,
    title: "LUCKA 8: Gissa flaggan",
    description:
      "Kan du se vilket land det är på bara en glimt av flaggan? Varje gissning avslöjar lite mer!",
    password: "hihi",
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
    title: "LUCKA 9: Gissa serien",
    description:
      "Kan ni lista ut vilken serie det är utifrån bilder? För varje gissning kommer en ny bild att dyka upp. Du måste skriva en gissning för att få nästa bild.",
    password: "ojoj",
    gameSlug: "gissa-serien",
    gameType: "musicvideo",
    musicVideoConfig: {
      images: [
        "/images/lastofus1.png",
        "/images/lastofus2.png",
        "/images/lastofus3.png",
        "/images/lastofus4.png",
        "/images/lastofus5.png",
        "/images/lastofus6.png",
      ],
      solution: "The Last of Us",
      acceptedAnswers: [
        "The Last of Us",
        "the last of us",
        "Last of Us",
        "last of us",
      ],
      videoUrl:
        "https://www.youtube-nocookie.com/embed/uLtkt8BonwM?autoplay=1&start=0",
    },
  },
  {
    id: 10,
    title: "LUCKA 10: Quizdag",
    description:
      "Idag är det quiiiizzz!!! Vem vinner???",
    password: "tjoho",
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
    password: "julia",
    gameSlug: "pixlad-film",
    gameType: "pixel-movie",
    pixelGuessConfig: {
      image: "/images/greenmile.jpg",
      solution: "The Green Mile",
      acceptedAnswers: [
        "the green mile",
        "green mile",
        "thegreenmile",
        "gröna milen",
        "den gröna milen",
        "grona milen",
      ],
      placeholder: "Vilken film är det?",
      successMessage: "🍿 Det stämmer! Filmen är The Green Mile.",
      revealMessage: "Syyynd! Filmen var The Green Mile.",
    },
  },
  {
    id: 12,
    title: "LUCKA 12: Musikfredag",
    description:
      "Det är fredag! Lyssna på några sekunder i taget och gissa låten. Skippa för att höra mer – men du får bara sex försök!",
    password: "slay",
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
    title: "Lucka 13: WORDLE",
    description:
      "Idag är det dags för ett nytt Wordle! Vad kan det vara?",
    password: "queen",
    gameSlug: "wordle-lag",
    gameType: "wordle",
    wordleConfig: {
      solution: "löven",
      maxGuesses: 6,
      instructions: "Gissa ordet!",
      hint: "Hemma på T3.",
    },
  },
  {
    id: 14,
    title: "LUCKA 14: Musikrebus",
    description:
      "Kan du lista ut vilken ikonisk låt det är med bara med emojis?",
    password: "jahaja",
    gameSlug: "musikrebus-1",
    gameType: "rebus",
    rebusConfig: {
      prompt: "💃💃💃🎉🎈🥳",
      solution: "Girls Just Wanna Have Fun",
      acceptedAnswers: [
        "Girls Just Wanna Have Fun",
        "Girls Just Want To Have Fun",
        "Girls just wanna have fun",
        "Girls just want to have fun",
      ],
    },
  },
  {
    id: 15,
    title: "LUCKA 15: Musikconnections",
    description:
      "Hitta fyra grupper med fyra ord vardera. För bättre förklaring tryck HÄR",
    password: "musik",
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
          words: ["Eye of the", "Black", "Soldier", "I Am the"],
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
    title: "LUCKA 16: Gissa landet",
    description:
      "Titta noga på bilden, vilket land gömmer sig här? Du har 6 försök på dig.",
    password: "tomte",
    gameSlug: "gissa-landet-2",
    gameType: "flag",
    flagGuessConfig: {
      image: "/images/japan.png",
      solution: "Japan",
      acceptedAnswers: ["Japan", "日本"],
    },
  },
  {
    id: 17,
    title: "LUCKA 17: Gissa musikvideon",
    description:
      "Kan ni lista ut vilken ikonisk musikvideo det är? För varje gissning kommer en ny bild att dyka upp. Du måste skriva en gissning för att få nästa bild.",
    password: "mat",
    gameSlug: "gissa-musikvideon",
    gameType: "musicvideo",
    musicVideoConfig: {
      images: [
        "/images/musicvideo1.png",
        "/images/musicvideo2.png",
        "/images/musicvideo3.png",
        "/images/musicvideo4.png",
        "/images/musicvideo5.png",
        "/images/musicvideo6.png",
      ],
      solution: "Take On Me",
      acceptedAnswers: [
        "Take on me",
        "take on me",
        "aha take on me",
        "a-ha take on me",
      ],
      videoUrl:
        "https://www.youtube-nocookie.com/embed/djV11Xbc914?autoplay=1&start=0",
    },
  },
  {
    id: 18,
    title: "LUCKA 18: Gissa huvudstaden",
    description:
      "Titta noga på flaggan, vilken HUVUDSTAD tillhör den? Du har 6 försök på dig.",
    password: "hejigen",
    gameSlug: "gissa-huvudstaden",
    gameType: "flag",
    flagGuessConfig: {
      image: "/images/nyazeeland.png",
      solution: "Wellington",
      acceptedAnswers: ["Wellington"],
      guessType: "capital",
    },
  },
  {
    id: 19,
    title: "LUCKA 19: Musikfredag",
    description:
      "Fredagsfeeling igen! Klarar du att gissa låten?",
    password: "etttilllösen",
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
    title: "LUCKA 20: Vem är det?",
    description:
      "Här bakom gömmer sig en känd person, men vem kan det vara? Bilden blir tydligare för varje gissning. Du har 6 gissningar att klura ut vem det är.",
    password: "trevligt",
    gameSlug: "pixlad-kandis",
    gameType: "pixel-movie",
    pixelGuessConfig: {
      image: "/images/barackobama.png",
      solution: "Barack Obama",
      acceptedAnswers: ["Barack Obama", "barack obama", "Obama", "obama"],
      placeholder: "Vem är det?",
      successMessage: "WOHOOOO Visst var det Barack Obama! ✨",
      revealMessage: "Det var Barack Obama!",
    },
  },
  {
    id: 21,
    title: "LUCKA 21: På spåret – ARTIST",
    description:
      "Följ ledtrådarna och lista ut vilken superstjärna vi är på väg mot!",
    password: "hejfamiljen",
    gameSlug: "pa-sparet-artist",
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
    id: 22,
    title: "LUCKA 22: Historiespel",
    description:
      "Titta på bilderna och gissa vilket år varje historiska händelse inträffade. Du har en gissning per event! Knappen för att trycka sig vidare kommer längst ner",
    password: "detnärmarsig",
    gameSlug: "historiespel",
    gameType: "history-guess",
    historyGuessConfig: {
      events: [
        {
          title: "Opera husets invigning",
          image: "/images/operahouse1973.png",
          year: 1973,
          description:
            "Sydney Opera House i Australien invigdes officiellt den 20 oktober 1973 av drottning Elizabeth II. Det ikoniska byggnadsverket, designat av den danske arkitekten Jørn Utzon, tog 14 år att bygga och har blivit ett av världens mest kända landmärken.",
        },
        {
          title: "Live Aid",
          image: "/images/liveaid1985.png",
          year: 1985,
          description:
            "Live Aid var en dubbel konsert som hölls den 13 juli 1985 samtidigt på Wembley Stadium i London och John F. Kennedy Stadium i Philadelphia. Konserten organiserades av Bob Geldof och Midge Ure för att samla in pengar till svältande människor i Etiopien. Cirka 1,5 miljarder människor tittade på TV-sändningen världen över.",
        },
        {
          title: "Justin Bieber Believe Tour",
          image: "/images/believe2013.png",
          year: 2013,
          description:
            "Justin Biebers Believe Tour startade i september 2012, men bilden är från 2013, och var hans tredje världsturné. Turnén följde hans tredje studioalbum 'Believe' och inkluderade över 150 konserter i Nordamerika, Europa, Asien, Oceanien och Latinamerika. Turnén blev en av de mest framgångsrika turnéerna det året.",
        },
        {
          title: "Evergreen skeppet som fastnade i Suezkanalen",
          image: "/images/ship2021.png",
          year: 2021,
          description:
            "Den 23 mars 2021 fastnade containerskeppet Ever Given i Suezkanalen och blockerade en av världens viktigaste handelsvägar i sex dagar. Skeppet, som är 400 meter långt, körde fast på grund av starka vindar och sandstorm. Händelsen orsakade enorma förseningar i global handel och kostade miljarder dollar.",
        },
        {
          title: "Bragden i Berlin",
          image: "/images/bragdeniberlin2012.png",
          year: 2012,
          description:
            "Den 16 oktober 2012 mötte Sveriges herrlandslag i fotboll Tysklands herrlandslag i fotboll på Olympiastadion, Berlin i ett VM-kval till VM 2014. Matchen var en dramatisk uppgörelse där Tyskland ledde med 4-0 innan Sverige vände och matchen slutade 4-4. Denna osannolika vändning har kommit att kallas för 'Bragden i Berlin' i svensk fotbollssammanhang.",
        },
      ],
    },
  },
  {
    id: 23,
    title: "ANOTHER ONE",
    description:
      "Vi tar en sista wordle va hihihi",
    password: "viärnära",
    gameSlug: "wordle-snart",
    gameType: "wordle",
    wordleConfig: {
      solution: "snart",
      maxGuesses: 6,
      instructions: "Gissa ordet!",
    },
  },
  {
    id: 24,
    title: "LUCKA 24: Escape room – God Jul",
    description:
      "Sista luckan! Idag blir det MAXAT DELUXE. Klara alla 5 nivåer för att få en present",
    password: "godjävlajul",
    gameSlug: "escape-room",
    gameType: "escape",
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

