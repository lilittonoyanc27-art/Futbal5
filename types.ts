export interface Player {
  name: string;
  avatar: "gor" | "gayane";
  score: number;
  goals: number;
  position: number; // 0 to 100 on the soccer pitch
}

export type PronounType = "direct" | "indirect" | "double";

export interface GrammarLesson {
  id: string;
  title: string;
  type: PronounType;
  concept: string; // Armenian explanation
  pronouns: { spanish: string; armenian: string; role: string }[];
  examples: { spanish: string; armenian: string; breakdownDescription: string }[];
}

export interface GameOneQuestion {
  id: number;
  sentence: string; // Spanish sentence with highlight e.g., "Yo como <span class='text-yellow-300 font-bold'>la manzana</span>"
  highlightedWord: string; // Spanish highlighted word e.g., "la manzana"
  translation: string; // Armenian translation e.g., "Ես ուտում եմ խնձորը"
  correctCategory: "direct" | "indirect";
  explanation: string; // Detailed Armenian explanation why it is Direct
}

export interface GameTwoQuestion {
  id: number;
  sentenceWithBlank: string; // e.g., "María ___ compra un coche a mí."
  options: string[]; // e.g., ["me", "te", "le"]
  correctOption: string;
  translation: string; // Armenian translation e.g., "Մարիան մեքենա է գնում ինձ համար"
  pronounType: PronounType;
  explanation: string; // Armenian explanation
}

export interface GameThreeQuestion {
  id: number;
  originalSentence: string; // e.g., "Carlos da las llaves a ti."
  translation: string; // Translation e.g., "Կառլոսը տալիս է բանալիները քեզ:"
  correctDoublePronoun: string; // e.g., "te las"
  options: string[]; // e.g., ["te las", "le las", "se las"]
  scrambledSentence: string; // e.g., "Carlos ___ da."
  explanation: string;
}

export interface AudioGameQuestion {
  id: number;
  title: string;
  audioText: string; // Spanish text to speak e.g. "Gisela compra unas flores hermosas para su madre y se las entrega hoy."
  translation: string; // Armenian translation
  questions: {
    questionText: string; // Question in Armenian e.g. "Ո՞ւմ համար է Ժիզելան գնում ծաղիկները:"
    options: string[]; // Options
    correctOption: string; // Correct Option
    explanation: string; // Armenian explanation
    optionTranslations?: string[]; // Translation of each option in Armenian
  }[];
}
