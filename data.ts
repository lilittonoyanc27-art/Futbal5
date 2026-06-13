import { GrammarLesson, GameOneQuestion, GameTwoQuestion, AudioGameQuestion } from "./types";

export const grammarLessons: GrammarLesson[] = [
  {
    id: "direct",
    title: "⚽ Ուղիղ դերանուններ (Direct Objects - Pronombres de Objeto Directo)",
    type: "direct",
    concept: "Ուղիղ դերանունները փոխարինում են այն առարկային կամ անձին, որին ուղղակիորեն կպչում է գործողությունը (պատասխանում են «Ի՞նչը» կամ «Ո՞ւմ» հարցերին): Ֆուտբոլում սա հենց ԳՆԴԱԿՆ է, որին մենք անմիջապես հարվածում ենք:",
    pronouns: [
      { spanish: "me", armenian: "ինձ", role: "Me (Ինձ)" },
      { spanish: "te", armenian: "քեզ", role: "Te (Քեզ)" },
      { spanish: "lo", armenian: "նրան / դրան (տղա / արական առարկա)", role: "Lo (Նրան/Այն - արական)" },
      { spanish: "la", armenian: "նրան / դրան (աղջիկ / իգական առարկա)", role: "La (Նրան/Այն - իգական)" },
      { spanish: "nos", armenian: "մեզ", role: "Nos (Մեզ)" },
      { spanish: "os", armenian: "ձեզ (Իսպանիայում)", role: "Os (Ձեզ)" },
      { spanish: "los", armenian: "նրանց / դրանց (արական)", role: "Los (Նրանց - արական)" },
      { spanish: "las", armenian: "նրանց / դրանց (իգական)", role: "Las (Նրանց - իգական)" }
    ],
    examples: [
      {
        spanish: "Gor patea el balón. -> Gor lo patea.",
        armenian: "Գոռը հարվածում է գնդակին: -> Գոռը հարվածում է դրան (այն):",
        breakdownDescription: "«El balón»-ը (գնդակը) արական է, ուստի փոխարինվում է «lo»-ով:"
      },
      {
        spanish: "Gayane dibuja la portería. -> Gayane la dibuja.",
        armenian: "Գայանեն նկարում է դարպասը: -> Գայանեն նկարում է դրան:",
        breakdownDescription: "«La portería»-ն (դարպասը) իգական է, ուստի փոխարինվում է «la»-ով:"
      }
    ]
  },
  {
    id: "indirect",
    title: "🏃‍♂️ Անուղղակի դերանուններ (Indirect Objects - Pronombres de Objeto Indirecto)",
    type: "indirect",
    concept: "Անուղղակի դերանունները ցույց են տալիս, թե ՈՒՄ ՀԱՄԱՐ կամ ՈՒՄ Է ուղղված գործողությունը (պատասխանում են «Ո՞ւմ» կամ «Ո՞ւմ համար» հարցերին): Ֆուտբոլում սա քո ԹԻՄԱԿԻՑՆ է, ում դու փոխանցում ես գնդակը:",
    pronouns: [
      { spanish: "me", armenian: "ինձ (համար)", role: "Me (Ինձ / Ինձ համար)" },
      { spanish: "te", armenian: "քեզ (համար)", role: "Te (Քեզ / Քեզ համար)" },
      { spanish: "le", armenian: "նրան (տղային կամ աղջկան)", role: "Le (Նրան / Նրա համար)" },
      { spanish: "nos", armenian: "մեզ (համար)", role: "Nos (Մեզ / Մեզ համար)" },
      { spanish: "os", armenian: "ձեզ (համար)", role: "Os (Ձեզ / Ձեզ համար)" },
      { spanish: "les", armenian: "նրանց (համար)", role: "Les (Նրանց / Նրանց համար)" }
    ],
    examples: [
      {
        spanish: "Gor pasa el balón a Gayane. -> Gor le pasa el balón.",
        armenian: "Գոռը փոխանցում է գնդակը Գայանեին: -> Գոռը նրան է փոխանցում գնդակը:",
        breakdownDescription: "«A Gayane»-ն դառնում է «le» (անուղղակի դերանուն, որովհետև գործողությունն ուղղված է նրան):"
      },
      {
        spanish: "El entrenador da consejos a los niños. -> El entrenador les da consejos.",
        armenian: "Մարզիչը խորհուրդներ է տալիս երեխաներին: -> Մարզիչը նրանց խորհուրդներ է տալիս:",
        breakdownDescription: "«A los niños»-ը (երեխաներին) հոգնակի է, ուստի դառնում է «les»:"
      }
    ]
  },
  {
    id: "double",
    title: "🏆 Կրկնակի դերանունների ոսկե կանոնը (Double Pronouns)",
    type: "double",
    concept: "Երբ նախադասության մեջ ունենք և՛ Ուղիղ, և՛ Անուղղակի դերանուն, նրանք խաղում են միասին: Կանոն 1. Անուղղակին (թիմակիցը) միշտ գալիս է Ուղիղից (գնդակից) ԱՌԱՋ: Կանոն 2. Եթե երկուսն էլ սկսվում են L տառով (օրինակ՝ le lo, les la), ապա առաջինը դառնում է «SE»: (Ոչ թե le lo, այլ SE LO!)",
    pronouns: [
      { spanish: "me lo / me la", armenian: "ինձ այն", role: "Անուղղակի + Ուղիղ" },
      { spanish: "te lo / te la", armenian: "քեզ այն", role: "Անուղղակի + Ուղիղ" },
      { spanish: "se lo / se la", armenian: "նրան այն (le lo-ի փոխարեն)", role: "SE + Ուղիղ" },
      { spanish: "nos lo / nos la", armenian: "մեզ այն", role: "Անուղղակի + Ուղիղ" },
      { spanish: "se lo (plur)", armenian: "նրանց այն (les lo-ի փոխարեն)", role: "SE + Ուղիղ" }
    ],
    examples: [
      {
        spanish: "Yo compro el regalo para ti. -> Yo te lo compro.",
        armenian: "Ես գնում եմ նվերը քեզ համար: -> Ես քեզ այն գնում եմ:",
        breakdownDescription: "«Te» (անուղղակի) + «lo» (ուղիղ - el regalo): Գալիս է բայի առջև:"
      },
      {
        spanish: "Gayane da la medalla a Gor. -> Gayane le la da (Սխալ!) -> Gayane se la da.",
        armenian: "Գայանեն տալիս է մեդալը Գոռին: -> Գայանեն նրան այն տալիս է:",
        breakdownDescription: "«le la»-ն դառնում է «se la», քանի որ երկու L-երն իրար չեն սիրում!"
      }
    ]
  }
];

export const gameOneQuestions: GameOneQuestion[] = [
  {
    id: 1,
    sentence: "Gor compra <span class='text-yellow-300 font-bold underline'>la camiseta de fútbol</span>.",
    highlightedWord: "la camiseta de fútbol",
    translation: "Գոռը գնում է ֆուտբոլային մարզաշապիկը:",
    correctCategory: "direct",
    explanation: "«La camiseta de fútbol»-ը այն իրն է, որը Գոռը գնում է (Պատասխանում է «Ի՞նչը» հարցին), ուստի այն ուղիղ խնդիր է (Direct) և կփոխարինվի «la»-ով:"
  },
  {
    id: 2,
    sentence: "Gayane regala un balón <span class='text-yellow-300 font-bold underline'>a su hermano</span>.",
    highlightedWord: "a su hermano",
    translation: "Գայանեն գնդակ է նվիրում իր եղբորը:",
    correctCategory: "indirect",
    explanation: "«A su hermano»-ն (եղբորը) ցույց է տալիս, թե ում համար է նախատեսված նվերը (Պատասխանում է «Ո՞ւմ» հարցին), ուստի այն անուղղակի խնդիր է (Indirect) և կփոխարինվի «le»-ով:"
  },
  {
    id: 3,
    sentence: "Los niños escucharán <span class='text-yellow-300 font-bold underline'>al entrenador</span>.",
    highlightedWord: "al entrenador",
    translation: "Երեխաները կլսեն մարզչին:",
    correctCategory: "direct",
    explanation: "«Al entrenador»-ը այն անձն է, ում ուղղակիորեն լսում են երեխաները (Լսում են «Ո՞ւմ» -> մարզչին), ուստի այն ուղիղ խնդիր է (Direct) և կփոխարինվի «lo»-ով:"
  },
  {
    id: 4,
    sentence: "El árbitro saca tarjeta roja <span class='text-yellow-300 font-bold underline'>al jugador</span>.",
    highlightedWord: "al jugador",
    translation: "Մրցավարը կարմիր քարտ է ցույց տալիս խաղացողին:",
    correctCategory: "indirect",
    explanation: "Կարմիր քարտը ցույց է տրվում «խաղացողին» (Ո՞ւմ է ուղղված), ուստի այն անուղղակի խնդիր է (Indirect) և կփոխարինվի «le»-ով:"
  },
  {
    id: 5,
    sentence: "Nosotros ganamos <span class='text-yellow-300 font-bold underline'>la Copa del Mundo</span>.",
    highlightedWord: "la Copa del Mundo",
    translation: "Մենք հաղթում ենք Աշխարհի գավաթը:",
    correctCategory: "direct",
    explanation: "«La Copa del Mundo»-ն այն մրցանակն է, որը մենք հաղթում ենք («Ի՞նչը»), ուստի այն ուղիղ խնդիր է (Direct) և կփոխարինվի «la»-ով:"
  },
  {
    id: 6,
    sentence: "Gor escribe una carta <span class='text-yellow-300 font-bold underline'>a Gayane</span>.",
    highlightedWord: "a Gayane",
    translation: "Գոռը նամակ է գրում Գայանեին:",
    correctCategory: "indirect",
    explanation: "Նամակը գրվում է «Գայանեին» (Ո՞ւմ համար), ուստի այն անուղղակի խնդիր է (Indirect) և կփոխարինվի «le»-ով:"
  },
  {
    id: 7,
    sentence: "Papá prepara la comida <span class='text-yellow-300 font-bold underline'>para nosotros</span>.",
    highlightedWord: "para nosotros",
    translation: "Հայրիկը պատրաստում է ուտելիքը մեզ համար:",
    correctCategory: "indirect",
    explanation: "«Para nosotros»-ը (մեզ համար) ակնհայտորեն ցույց է տալիս շահառուին, ուստի այն անուղղակի խնդիր է (Indirect) և կփոխարինվի «nos»-ով:"
  },
  {
    id: 8,
    sentence: "Gayane limpia <span class='text-yellow-300 font-bold underline'>sus botas de fútbol</span>.",
    highlightedWord: "sus botas de fútbol",
    translation: "Գայանեն մաքրում է իր ֆուտբոլային խաղակոշիկները:",
    correctCategory: "direct",
    explanation: "Գայանեն մաքրում է «խաղակոշիկները» («Ի՞նչը»), ուստի այն ուղիղ խնդիր է (Direct) և կփոխարինվի «las»-ով:"
  }
];

export const gameTwoQuestions: GameTwoQuestion[] = [
  {
    id: 1,
    sentenceWithBlank: "Carlos ___ pasa el balón a mí.",
    options: ["me", "te", "le"],
    correctOption: "me",
    translation: "Կառլոսը գնդակը փոխանցում է ինձ:",
    pronounType: "indirect",
    explanation: "«A mí» (ինձ) ցույց է տալիս, որ գործողությունն ուղղված է «ինձ», ուստի օգտագործվում է անուղղակի դերանուն «me»-ն:"
  },
  {
    id: 2,
    sentenceWithBlank: "Gayane compra la camiseta y ___ lleva puesta.",
    options: ["lo", "la", "le"],
    correctOption: "la",
    translation: "Գայանեն գնում է մարզաշապիկը և կրում է այն:",
    pronounType: "direct",
    explanation: "«La camiseta»-ն իգական սեռի ուղիղ խնդիր է («Ի՞նչը»), ուստի փոխարինվում է «la» դերանունով:"
  },
  {
    id: 3,
    sentenceWithBlank: "El entrenador ___ da instrucciones a los jugadores.",
    options: ["nos", "os", "les"],
    correctOption: "les",
    translation: "Մարզիչը ցուցումներ է տալիս խաղացողներին:",
    pronounType: "indirect",
    explanation: "«A los jugadores»-ը (խաղացողներին) հոգնակի երրորդ դեմք է (նրանց), ուստի անուղղակի դերանունը կլինի «les»:"
  },
  {
    id: 4,
    sentenceWithBlank: "Nosotros tenemos el balón. Nosotros ___ pasamos.",
    options: ["lo", "la", "le"],
    correctOption: "lo",
    translation: "Մենք ունենք գնդակը: Մենք փոխանցում ենք այն:",
    pronounType: "direct",
    explanation: "«El balón»-ը արական սեռի եզակի ուղիղ խնդիր է, ուստի փոխարինվում է «lo» դերանունով:"
  },
  {
    id: 5,
    sentenceWithBlank: "Gayane ___ regala botas de fútbol a ti.",
    options: ["me", "te", "le"],
    correctOption: "te",
    translation: "Գայանեն ֆուտբոլային խաղակոշիկներ է նվիրում քեզ:",
    pronounType: "indirect",
    explanation: "«A ti» (քեզ) ցույց է տալիս, որ գործողությունն ուղղված է «քեզ», ուստի օգտագործվում է անուղղակի դերանուն «te»-ն:"
  },
  {
    id: 6,
    sentenceWithBlank: "Yo veo a los niños en el campo. Yo ___ llamo.",
    options: ["los", "las", "les"],
    correctOption: "los",
    translation: "Ես տեսնում եմ երեխաներին դաշտում: Ես կանչում եմ նրանց:",
    pronounType: "direct",
    explanation: "«Los niños»-ը արական հոգնակի ուղիղ խնդիր է, ուստի փոխարինվում է «los»-ով:"
  },
  {
    id: 7,
    sentenceWithBlank: "El árbitro ve la falta y ___ pita inmediatamente.",
    options: ["lo", "la", "le"],
    correctOption: "la",
    translation: "Մրցավարը տեսնում է կանոնների խախտումը և անմիջապես սուլում է այն:",
    pronounType: "direct",
    explanation: "«La falta»-ն (կանոնների խախտումը) իգական սեռի եզակի ուղիղ խնդիր է, ուստի փոխարինվում է «la»-ով:"
  },
  {
    id: 8,
    sentenceWithBlank: "Mis amigos ___ escriben mensajes de felicitación a nosotros.",
    options: ["me", "te", "nos"],
    correctOption: "nos",
    translation: "Ընկերներս շնորհավորական հաղորդագրություններ են գրում մեզ:",
    pronounType: "indirect",
    explanation: "«A nosotros» (մեզ) ցույց է տալիս անուղղակի շահառուներին, ուստի օգտագործվում է անուղղակի դերանուն «nos»-ը:"
  }
];

export const audioGameQuestions: AudioGameQuestion[] = [
  {
    id: 1,
    title: "📋 Աուդիո Խաղ 1: Կառլոսի վաղվա խաղը (El partido de Carlos)",
    audioText: "Carlos jugará mañana.",
    translation: "Կառլոսը վաղը կխաղա:",
    questions: [
      {
        questionText: "Ի՞նչ կանի Կառլոսը վաղը:",
        options: ["jugará", "dormirá", "leerá"],
        correctOption: "jugará",
        optionTranslations: ["Կխաղա", "Կքնի", "Կկարդա"],
        explanation: "«jugará»-ն jugar (խաղալ) բայի եզակի 3-րդ դեմքի ապառնի ձևն է, որը նշանակում է «կխաղա»:"
      }
    ]
  },
  {
    id: 2,
    title: "📋 Աուդիո Խաղ 2: Լուսիայի գոլը (El gol de Lucía)",
    audioText: "Lucía anotará un gol.",
    translation: "Լուսիան գոլ կխփի:",
    questions: [
      {
        questionText: "Ի՞նչ կանի Լուսիան:",
        options: ["anotará", "correrá", "perderá"],
        correctOption: "anotará",
        optionTranslations: ["Գոլ կխփի", "Կվազի", "Կկորցնի"],
        explanation: "«anotará»-ն anotar (արձանագրել / խփել) բայի ապառնի ժամանակն է, այսինքն՝ «կխփի»:"
      }
    ]
  },
  {
    id: 3,
    title: "📋 Աուդիո Խաղ 3: Մեր թիմի հաղթանակը (La copa mundial)",
    audioText: "El equipo ganará copa.",
    translation: "Թիմը կհաղթի գավաթը:",
    questions: [
      {
        questionText: "Ո՞վ կհաղթի գավաթը:",
        options: ["El equipo", "El entrenador", "Carlos"],
        correctOption: "El equipo",
        optionTranslations: ["Թիմը", "Մարզիչը", "Կառլոսը"],
        explanation: "«El equipo» նշանակում է թիմ, որն էլ նախադասության ենթական է:"
      }
    ]
  },
  {
    id: 4,
    title: "📋 Աուդիո Խաղ 4: Արագ վազք (Correr rápido)",
    audioText: "Los niños correrán rápido.",
    translation: "Երեխաները արագ կվազեն:",
    questions: [
      {
        questionText: "Ինչպե՞ս կվազեն երեխաները:",
        options: ["rápido", "despacio", "tranquilo"],
        correctOption: "rápido",
        optionTranslations: ["Արագ", "Դանդաղ", "Հանգիստ"],
        explanation: "«rápido» նշանակում է արագ:"
      }
    ]
  },
  {
    id: 5,
    title: "📋 Աուդիո Խաղ 5: Նոր մարզակոշիկներ (Nuevas botas)",
    audioText: "Papá comprará botas nuevas.",
    translation: "Հայրիկը նոր կոշիկներ կգնի:",
    questions: [
      {
        questionText: "Ի՞նչ կգնի հայրիկը:",
        options: ["botas", "balones", "agua"],
        correctOption: "botas",
        optionTranslations: ["Մարզակոշիկներ", "Գնդակներ", "Ջուր"],
        explanation: "«botas» նշանակում է խաղակոշիկներ / կոշիկներ:"
      }
    ]
  },
  {
    id: 6,
    title: "📋 Աուդիո Խաղ 6: Ուրախ երգ (Lucía cantará)",
    audioText: "Lucía cantará feliz.",
    translation: "Լուսիան ուրախ կերգի:",
    questions: [
      {
        questionText: "Ինչպե՞ս կերգի Լուսիան:",
        options: ["feliz", "triste", "silencioso"],
        correctOption: "feliz",
        optionTranslations: ["Ուրախ", "Տխուր", "Լուռ"],
        explanation: "«feliz» նշանակում է ուրախ / երջանիկ:"
      }
    ]
  },
  {
    id: 7,
    title: "📋 Աուդիո Խաղ 7: Մարզչի գալուստը (El entrenador)",
    audioText: "El entrenador vendrá pronto.",
    translation: "Մարզիչը շուտով կգա:",
    questions: [
      {
        questionText: "Ո՞վ կգա շուտով:",
        options: ["El entrenador", "Carlos", "El portero"],
        correctOption: "El entrenador",
        optionTranslations: ["Մարզիչը", "Կառլոսը", "Դարպասապահը"],
        explanation: "«El entrenador» նշանակում է մարզիչ:"
      }
    ]
  },
  {
    id: 8,
    title: "📋 Աուդիո Խաղ 8: Գնդակի փոխանցում (Carlos pasará)",
    audioText: "Carlos pasará el balón.",
    translation: "Կառլոսը կփոխանցի գնդակը:",
    questions: [
      {
        questionText: "Ի՞նչ կանի Կառլոսը գնդակի հետ:",
        options: ["pasará", "mantendrá", "robará"],
        correctOption: "pasará",
        optionTranslations: ["Կփոխանցի", "Կպահի", "Կխլի"],
        explanation: "«pasará»-ն pasar (փոխանցել) բայի ապառնի ժամանակի ձևն է, այսինքն՝ «կփոխանցի»:"
      }
    ]
  },
  {
    id: 9,
    title: "📋 Աուդիո Խաղ 9: Դարպասապահի սեյվը (La portera parará)",
    audioText: "La portera parará balón.",
    translation: "Դարպասապահուհին կկանգնեցնի գնդակը:",
    questions: [
      {
        questionText: "Ո՞վ կկանգնեցնի գնդակը:",
        options: ["La portera", "El público", "El entrenador"],
        correctOption: "La portera",
        optionTranslations: ["Դարպասապահուհին", "Հանդիսատեսը", "Մարզիչը"],
        explanation: "«La portera» նշանակում է դարպասապահուհի:"
      }
    ]
  },
  {
    id: 10,
    title: "📋 Աուդիո Խաղ 10: ՈՒշացած տոն (La fiesta empezará)",
    audioText: "La fiesta empezará tarde.",
    translation: "Տոնակատարությունը կսկսվի ուշ:",
    questions: [
      {
        questionText: "Ե՞րբ կսկսվի տոնակատարությունը:",
        options: ["tarde", "pronto", "hoy"],
        correctOption: "tarde",
        optionTranslations: ["Ուշ", "Շուտով", "Այսօր"],
        explanation: "«tarde» նշանակում է ուշ:"
      }
    ]
  }
];
