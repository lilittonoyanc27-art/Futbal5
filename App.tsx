import React, { useState, useEffect } from "react";
import { Player, PronounType, GrammarLesson } from "./types";
import { grammarLessons } from "./data";
import SoccerPitch from "./SoccerPitch";
import AudioQuiz from "./AudioQuiz";
import PronounGame from "./PronounGame";
import { Trophy, HelpCircle, Star, Sparkles, BookOpen, Volume2, Gamepad2, ArrowRight, UserCheck } from "lucide-react";

export default function App() {
  // Initiating the 2 kids players
  const [playerGor, setPlayerGor] = useState<Player>({
    name: "Գոռ",
    avatar: "gor",
    score: 0,
    goals: 0,
    position: 0, // Starts at 0%
  });

  const [playerGayane, setPlayerGayane] = useState<Player>({
    name: "Գայանե",
    avatar: "gayane",
    score: 0,
    goals: 0,
    position: 0, // Starts at 0%
  });

  const [currentPlayer, setCurrentPlayer] = useState<"gor" | "gayane">("gor");
  const [activeTab, setActiveTab] = useState<"lessons" | "games" | "audio">("lessons");
  const [totalTrophies, setTotalTrophies] = useState<number>(0);
  const [selectedLessonId, setSelectedLessonId] = useState<string>("direct");

  // State to trigger celebratory visual Goal popup
  const [goalAnimation, setGoalAnimation] = useState<{ active: boolean; player: string }>({
    active: false,
    player: "",
  });

  // Handlers for correct / incorrect answers in games
  const handleCorrectAnswer = () => {
    // Current player advances by 20% on the soccer field
    if (currentPlayer === "gor") {
      setPlayerGor((prev) => {
        const nextPos = prev.position + 20;
        if (nextPos >= 100) {
          triggerGoal("gor");
          return { ...prev, position: 0, score: prev.score + 50, goals: prev.goals + 1 };
        }
        return { ...prev, position: nextPos, score: prev.score + 25 };
      });
    } else {
      setPlayerGayane((prev) => {
        const nextPos = prev.position + 20;
        if (nextPos >= 100) {
          triggerGoal("gayane");
          return { ...prev, position: 0, score: prev.score + 50, goals: prev.goals + 1 };
        }
        return { ...prev, position: nextPos, score: prev.score + 25 };
      });
    }

    // Auto switch turn (so both Gor & Gayane participate alternatively)
    setCurrentPlayer((prev) => (prev === "gor" ? "gayane" : "gor"));
  };

  const handleIncorrectAnswer = () => {
    // Current player fails, back down by 10% (bottom threshold is 0)
    if (currentPlayer === "gor") {
      setPlayerGor((prev) => {
        const nextPos = Math.max(0, prev.position - 10);
        return { ...prev, position: nextPos };
      });
    } else {
      setPlayerGayane((prev) => {
        const nextPos = Math.max(0, prev.position - 10);
        return { ...prev, position: nextPos };
      });
    }

    // Auto switch turn to let the other child try
    setCurrentPlayer((prev) => (prev === "gor" ? "gayane" : "gor"));
  };

  // Trigger Goal Event
  const triggerGoal = (player: string) => {
    setGoalAnimation({ active: true, player });
    setTotalTrophies((prev) => prev + 1);

    // Cancel animation after 4 seconds
    setTimeout(() => {
      setGoalAnimation({ active: false, player: "" });
    }, 4500);
  };

  const activeLesson: GrammarLesson =
    grammarLessons.find((l) => l.id === selectedLessonId) || grammarLessons[0];

  return (
    <div className="min-h-screen bg-green-50/70 pb-16 font-sans">
      
      {/* Visual Header */}
      <header className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 text-white shadow-lg relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 opacity-10 text-[180px] pointer-events-none select-none">
          ⚽
        </div>
        <div className="absolute left-8 top-10 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 py-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 transition-all backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold border border-white/20 cursor-default">
              <Trophy className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
              <span>Իսպաներենի Դասընթաց Երեխաների Համար</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ֆուտբոլային Դերանունների <span className="text-yellow-300 underline decoration-wavy">Աշխարհի Գավաթ</span>
            </h1>
            
            <p className="text-emerald-100 max-w-xl text-xs sm:text-sm font-medium">
              Իմացի՛ր իսպաներենի <strong>Ուղիղ (Objeto Directo)</strong> և <strong>Անուղղակի (Objeto Indirecto)</strong> դերանունները, խաղա՛ Գոռի և Գայանեի հետ, կատարի՛ր փոխանցումներ, խփի՛ր գոլեր և նվաճի՛ր Աշխարհի Գավաթը:
            </p>
          </div>

          {/* Quick Stats display widget */}
          <div className="bg-white/15 backdrop-blur-md p-4 rounded-3xl border border-white/15 flex items-center gap-4 text-center">
            <div>
              <span className="text-[10px] uppercase text-emerald-100 font-bold block">Ընդհանուր մրցաշարեր</span>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <Trophy className="w-7 h-7 text-yellow-300" />
                <span className="text-3xl font-extrabold text-white">{totalTrophies}</span>
              </div>
            </div>
            <div className="h-10 w-px bg-white/20"></div>
            <div className="text-left font-mono text-xs text-emerald-100 space-y-0.5">
              <div>👦 Գոռ՝ {playerGor.goals} գոլ • {playerGor.score} միավոր</div>
              <div>👧 Գայանե՝ {playerGayane.goals} գոլ • {playerGayane.score} միավոր</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid View Container */}
      <main className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Soccer Pitch Status Screen */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-6 space-y-6">
            
            {/* Interactive Pitch displaying Gor / Gayane coordinates */}
            <SoccerPitch
              playerGor={playerGor}
              playerGayane={playerGayane}
              currentPlayer={currentPlayer}
              onSelectPlayer={(p) => setCurrentPlayer(p)}
              goalAnimation={goalAnimation}
              totalTrophies={totalTrophies}
            />

            {/* Quick Hero Select Toggle */}
            <div className="bg-white p-4 rounded-3xl border border-emerald-100/50 shadow flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Ակտիվ հարվածող՝</span>
              </span>
              
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  id="select-gor-hero-btn"
                  onClick={() => setCurrentPlayer("gor")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPlayer === "gor" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  👦 Գոռ (Gor)
                </button>
                <button
                  id="select-gayane-hero-btn"
                  onClick={() => setCurrentPlayer("gayane")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentPlayer === "gayane" ? "bg-rose-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  👧 Գայանե (Gayane)
                </button>
              </div>
            </div>

            {/* Soccer Coach Proverb / Motivation Box */}
            <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/5 border border-amber-500/20 p-4 rounded-3xl text-xs text-amber-900 space-y-2">
              <div className="flex items-center gap-1.5 font-bold">
                <span>👴⚽</span>
                <span>Մարզիչ Դիեգոյի Խորհուրդը</span>
              </div>
              <p className="italic leading-normal">
                «Չեմպիո՛ն, միշտ հիշիր, որ իսպաներենում դերանունները սիրում են կանգնել բայից <strong>ԱՌԱՋ</strong> (օրինակ՝ "Yo <strong>lo</strong> tengo"): Բայց եթե ունենք հրամայական եղանակ կամ անորոշ դերբայ, դրանք կպչում են բայի վերջին (օրինակ՝ "¡Pát<strong>ealo</strong>!" - հարվածի՛ր դրան / գնդակին):»
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Primary Workspaces / Navigation Tabs */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Navigation tabs */}
          <div className="flex bg-slate-200/80 p-1.5 rounded-2xl border border-slate-300/40">
            <button
              id="tab-lessons-btn"
              onClick={() => setActiveTab("lessons")}
              className={`flex-1 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "lessons"
                  ? "bg-white text-slate-800 shadow-md scale-102"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>📚 Դերանունների Դպրոց</span>
            </button>

            <button
              id="tab-games-btn"
              onClick={() => setActiveTab("games")}
              className={`flex-1 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "games"
                  ? "bg-white text-slate-800 shadow-md scale-102"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>🎮 Մինի Խաղեր (2 Խաղ)</span>
            </button>

            <button
              id="tab-audio-btn"
              onClick={() => setActiveTab("audio")}
              className={`flex-1 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "audio"
                  ? "bg-white text-slate-800 shadow-md scale-102"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
              }`}
            >
              <Volume2 className="w-4 h-4 text-rose-600" />
              <span>🎧 Աուդիո Վիկտորինա</span>
            </button>
          </div>

          {/* RENDERING ACTIVE TAB VIEW */}

          {/* 1. LESSONS SECTION */}
          {activeTab === "lessons" && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Concept Tabs Selector */}
              <div className="flex gap-2 justify-center">
                {grammarLessons.map((lesson) => (
                  <button
                    id={`lesson-selector-${lesson.id}`}
                    key={lesson.id}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      selectedLessonId === lesson.id
                        ? "bg-emerald-600 text-white border-emerald-800 shadow-sm"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-emerald-50"
                    }`}
                  >
                    {lesson.id === "direct" && "⚽ Objeto Directo"}
                    {lesson.id === "indirect" && "🏃‍♂️ Objeto Indirecto"}
                    {lesson.id === "double" && "🏆 Double Pronouns"}
                  </button>
                ))}
              </div>

              {/* Display Active Grammar Content */}
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-emerald-50 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    {activeLesson.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    {activeLesson.concept}
                  </p>
                </div>

                {/* Pronouns Table Visual */}
                <div className="border border-emerald-100 rounded-2xl overflow-hidden bg-emerald-50/20">
                  <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold grid grid-cols-2">
                    <div>Իսպաներեն դերանուն</div>
                    <div>Հայերեն թարգմանություն</div>
                  </div>
                  <div className="divide-y divide-emerald-100/70">
                    {activeLesson.pronouns.map((p, idx) => (
                      <div key={idx} className="px-4 py-2.5 text-xs grid grid-cols-2 hover:bg-emerald-50/50 transition-colors">
                        <span className="font-mono font-bold text-emerald-800 text-sm">{p.spanish}</span>
                        <span className="text-slate-700 font-semibold">{p.armenian}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Examples */}
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                    <span>Իլյուստրատիվ Օրինակներ երեխաների համար՝</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeLesson.examples.map((ex, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 relative overflow-hidden flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-emerald-600 block mb-1">
                            Օրինակ {idx + 1}
                          </div>
                          
                          <p className="text-sm font-mono font-bold text-emerald-900 mb-1 select-all">
                            {ex.spanish}
                          </p>
                          
                          <p className="text-xs text-slate-600 font-semibold mb-3">
                            {ex.armenian}
                          </p>
                        </div>
                        
                        <div className="bg-yellow-500/10 p-2.5 rounded-xl border border-yellow-500/20 text-[11px] text-amber-950 font-medium">
                          <strong>💡 Ինչո՞ւ է այդպես՝</strong> {ex.breakdownDescription}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h5 className="font-bold text-sm text-yellow-300">Պատրա՞ստ ես փորձարկել գիտելիքներդ։</h5>
                    <p className="text-xs text-slate-300 mt-1">Անցիր երեխաների համար նախատեսված 2 ինտերակտիվ մինի խաղերին։</p>
                  </div>
                  <button
                    id="lesson-cta-games-btn"
                    onClick={() => setActiveTab("games")}
                    className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0 shadow-md"
                  >
                    <span>Խաղալ երկու խաղերը</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* 2. THREE DYNAMIC KIDS GAMES */}
          {activeTab === "games" && (
            <div className="animate-fade-in">
              <PronounGame
                onCorrectAnswer={handleCorrectAnswer}
                onIncorrectAnswer={handleIncorrectAnswer}
                currentPlayerName={currentPlayer === "gor" ? "Գոռ" : "Գայանե"}
              />
            </div>
          )}

          {/* 3. AUDIO VOICE TESTS WITH QUIZ */}
          {activeTab === "audio" && (
            <div className="animate-fade-in">
              <AudioQuiz
                onCorrectAnswer={handleCorrectAnswer}
                onIncorrectAnswer={handleIncorrectAnswer}
                currentPlayerName={currentPlayer === "gor" ? "Գոռ" : "Գայանե"}
              />
            </div>
          )}

        </div>

      </main>

      {/* Decorative Football Field Footer */}
      <footer className="mt-16 text-center text-xs text-slate-500 max-w-4xl mx-auto px-4 space-y-2 border-t border-dashed border-slate-200 pt-6">
        <p className="font-semibold text-slate-600">
          Ֆուտբոլային Դերանուններ՝ Գոռ և Գայանե © {new Date().getFullYear()} – Իսպաներենի զվարճալի ուսուցում երեխաների համար
        </p>
        <p className="text-[10px] text-slate-400">
          Մշակված է հատուկ երեխաներին իսպաներենի անձնական ուղիղ և անուղղակի դերանունները (pronombres átonos de OD y OI) մատչելի բացատրելու նպատակով։
        </p>
      </footer>

    </div>
  );
}
