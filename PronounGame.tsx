import React, { useState } from "react";
import { GameOneQuestion, GameTwoQuestion, PronounType } from "./types";
import { gameOneQuestions, gameTwoQuestions, grammarLessons } from "./data";
import { Check, X, Shield, ArrowRight, HelpCircle, Award, Star, Zap, Info } from "lucide-react";

interface PronounGameProps {
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
  currentPlayerName: string;
}

export default function PronounGame({ onCorrectAnswer, onIncorrectAnswer, currentPlayerName }: PronounGameProps) {
  const [activeGameTab, setActiveGameTab] = useState<number>(1); // Games: 1, 2
  
  // Game 1 State
  const [g1Index, setG1Index] = useState<number>(0);
  const [g1Answered, setG1Answered] = useState<boolean>(false);
  const [g1UserChoice, setG1UserChoice] = useState<"direct" | "indirect" | null>(null);
  const [g1IsCorrect, setG1IsCorrect] = useState<boolean | null>(null);

  // Game 2 State
  const [g2Index, setG2Index] = useState<number>(0);
  const [g2Answered, setG2Answered] = useState<boolean>(false);
  const [g2UserChoice, setG2UserChoice] = useState<string | null>(null);
  const [g2IsCorrect, setG2IsCorrect] = useState<boolean | null>(null);

  // General Reset State / Setup helper
  const handleGame1SelectAns = (choice: "direct" | "indirect") => {
    if (g1Answered) return;
    setG1UserChoice(choice);
  };

  const handleSubmitG1 = () => {
    if (!g1UserChoice || g1Answered) return;
    const item = gameOneQuestions[g1Index];
    const correct = g1UserChoice === item.correctCategory;
    setG1IsCorrect(correct);
    setG1Answered(true);

    if (correct) {
      onCorrectAnswer();
    } else {
      onIncorrectAnswer();
    }
  };

  const handleNextG1 = () => {
    setG1Answered(false);
    setG1UserChoice(null);
    setG1IsCorrect(null);
    setG1Index((prev) => (prev + 1) % gameOneQuestions.length);
  };


  // Game 2 Handlers
  const handleGame2SelectAns = (option: string) => {
    if (g2Answered) return;
    setG2UserChoice(option);
  };

  const handleSubmitG2 = () => {
    if (!g2UserChoice || g2Answered) return;
    const item = gameTwoQuestions[g2Index];
    const correct = g2UserChoice === item.correctOption;
    setG2IsCorrect(correct);
    setG2Answered(true);

    if (correct) {
      onCorrectAnswer();
    } else {
      onIncorrectAnswer();
    }
  };

  const handleNextG2 = () => {
    setG2Answered(false);
    setG2UserChoice(null);
    setG2IsCorrect(null);
    setG2Index((prev) => (prev + 1) % gameTwoQuestions.length);
  };

  // Get active items
  const activeG1Item = gameOneQuestions[g1Index];
  const activeG2Item = gameTwoQuestions[g2Index];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-emerald-100 max-w-4xl mx-auto">
      
      {/* Game Tab Header Selectors */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          id="game-tab-1-btn"
          onClick={() => setActiveGameTab(1)}
          className={`flex-1 py-3 px-4 rounded-2xl font-bold transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
            activeGameTab === 1
              ? "bg-blue-600 text-white shadow-lg scale-102 border-b-4 border-blue-800"
              : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <span className="text-xl">🥅 Խաղ 1</span>
          <span className="text-xs font-bold mt-0.5">Ուղիղ թե՞ Անուղղակի</span>
          <span className="text-[10px] opacity-75 mt-0.5">(Direct vs Indirect)</span>
        </button>

        <button
          id="game-tab-2-btn"
          onClick={() => setActiveGameTab(2)}
          className={`flex-1 py-3 px-4 rounded-2xl font-bold transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
            activeGameTab === 2
              ? "bg-rose-600 text-white shadow-lg scale-102 border-b-4 border-rose-800"
              : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <span className="text-xl">⚽ Խաղ 2</span>
          <span className="text-xs font-bold mt-0.5">Գտիր ճիշտ դերանունը</span>
          <span className="text-[10px] opacity-75 mt-0.5">(Fill in the Pronoun)</span>
        </button>
      </div>

      {/****************** GAME 1 SECTION *******************/}
      {activeGameTab === 1 && (
        <div className="space-y-4 animate-fade-in">
          {/* Quick kids explanation */}
          <div className="bg-blue-50 border border-blue-200/60 p-3 rounded-2xl text-xs text-blue-900 flex items-center gap-2">
            <span className="text-lg">📢</span>
            <p>
              <strong>Ինչպե՞ս հաղթել՝</strong> Ուղղակի խնդիրը (Direct) պատասխանում է <strong>Ի՞նչը / Ո՞ւմ</strong> հարցին (դա գնդակն է): Անուղղակին (Indirect) պատասխանում է <strong>Ո՞ւմ համար / Ո՞ւմ</strong> հարցին (դա թիմակիցն է):
            </p>
          </div>

          <div className="flex justify-between items-center text-xs font-bold text-slate-500">
            <span>Հարց {g1Index + 1} / {gameOneQuestions.length}</span>
            <span className="text-blue-600 bg-blue-100/70 px-2 py-0.5 rounded-full">Խաղացող՝ {currentPlayerName}</span>
          </div>

          {/* Sentence Display Card */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl text-center shadow-md relative overflow-hidden">
            <div className="absolute right-3 top-3 text-[10px] text-white/50 border border-white/20 rounded px-1.5 font-mono">
              Իսպաներեն
            </div>
            
            <p 
              className="text-lg font-bold leading-relaxed tracking-wide italic"
              dangerouslySetInnerHTML={{ __html: activeG1Item.sentence }}
            />
            
            <div className="my-3 border-t border-dashed border-white/20"></div>
            
            <span className="text-[10px] text-emerald-400 font-bold block mb-1 uppercase">🇦🇲 Հայերեն թարգմանություն</span>
            <p className="text-sm font-semibold text-slate-300">
              {activeG1Item.translation}
            </p>
          </div>

          {/* Active Highlight word target detail */}
          <div className="text-center">
            <p className="text-xs text-slate-600 font-bold">
              Որոշի՛ր՝ ընդգծված <span className="bg-yellow-100 text-slate-900 px-1.5 py-0.5 rounded text-xs font-extrabold font-mono">"{activeG1Item.highlightedWord}"</span> հատվածը ուղի՞ղ է, թե՞ անուղղակի դերանուն:
            </p>
          </div>

          {/* Two Large Soccer Goal Options */}
          <div className="grid grid-cols-2 gap-4">
            <button
              id="g1-direct-btn"
              onClick={() => handleGame1SelectAns("direct")}
              disabled={g1Answered}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group ${
                g1UserChoice === "direct"
                  ? "bg-blue-600 border-blue-800 text-white shadow-md scale-102"
                  : "bg-white border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-blue-50/20"
              } ${g1Answered && activeG1Item.correctCategory !== "direct" ? "opacity-50" : ""}`}
            >
              <div className="text-3xl group-hover:scale-110 transition-transform">⚽️</div>
              <span className="font-extrabold text-sm uppercase tracking-wide">Ուղղակի խնդիր</span>
              <span className="text-[10px] opacity-80">(Direct - Ի՞նչը / Ո՞ւմ)</span>
              {g1Answered && activeG1Item.correctCategory === "direct" && (
                <Check className="w-5 h-5 text-emerald-500 absolute -top-1 -right-1 bg-white rounded-full p-0.5" />
              )}
            </button>

            <button
              id="g1-indirect-btn"
              onClick={() => handleGame1SelectAns("indirect")}
              disabled={g1Answered}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group ${
                g1UserChoice === "indirect"
                  ? "bg-rose-600 border-rose-800 text-white shadow-md scale-102"
                  : "bg-white border-slate-200 text-slate-800 hover:border-rose-400 hover:bg-rose-50/20"
              } ${g1Answered && activeG1Item.correctCategory !== "indirect" ? "opacity-50" : ""}`}
            >
              <div className="text-3xl group-hover:scale-110 transition-transform">👥</div>
              <span className="font-extrabold text-sm uppercase tracking-wide">Անուղղակի խնդիր</span>
              <span className="text-[10px] opacity-80">(Indirect - Ո՞ւմ համար)</span>
              {g1Answered && activeG1Item.correctCategory === "indirect" && (
                <Check className="w-5 h-5 text-emerald-500 absolute -top-1 -right-1 bg-white rounded-full p-0.5" />
              )}
            </button>
          </div>

          {/* Action Trigger Area */}
          <div className="min-h-16">
            {!g1Answered ? (
              <button
                id="g1-submit-btn"
                onClick={handleSubmitG1}
                disabled={!g1UserChoice}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-1 shadow cursor-pointer text-xs ${
                  g1UserChoice
                    ? "bg-amber-500 hover:bg-amber-600 text-white font-extrabold"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                Հարվածել դարպասին ⚽
              </button>
            ) : (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 animate-fade-in text-xs">
                <div className="flex items-center gap-2">
                  {g1IsCorrect ? (
                    <span className="text-emerald-600 font-extrabold flex items-center gap-1 text-sm">
                      🎉 ՃԻՇՏ Է • Դուք հարվածեցիք և խփեցիք ԳՈԼ! (+20մ)
                    </span>
                  ) : (
                    <span className="text-rose-600 font-extrabold flex items-center gap-1 text-sm">
                      😢 ՍԽԱԼ • Դարպասապահը սեյվ կատարեց:
                    </span>
                  )}
                </div>
                <p className="text-slate-600 leading-relaxed font-medium">
                  <strong>Բացատրություն՝</strong> {activeG1Item.explanation}
                </p>
                <button
                  id="g1-next-btn"
                  onClick={handleNextG1}
                  className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Հաջորդ հարցը</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/****************** GAME 2 SECTION *******************/}
      {activeGameTab === 2 && (
        <div className="space-y-4 animate-fade-in">
          {/* Rules Banner */}
          <div className="bg-rose-50 border border-rose-200/60 p-3 rounded-2xl text-xs text-rose-900 flex items-center gap-2">
            <span className="text-lg">💡</span>
            <p>
              <strong>Ինչպե՞ս խաղալ՝</strong> Ընտրիր ճիշտ դերանունը դատարկ տեղը լրացնելու համար: Մտածի՛ր՝ նախադասությունը ուղիղ խնդի՞ր է պահանջում (lo/la/los/las), թե՞ անուղղակի (me/te/le/nos/les):
            </p>
          </div>

          <div className="flex justify-between items-center text-xs font-bold text-slate-500">
            <span>Հարց {g2Index + 1} / {gameTwoQuestions.length}</span>
            <span className="text-rose-600 bg-rose-100/70 px-2 py-0.5 rounded-full">Խաղացող՝ {currentPlayerName}</span>
          </div>

          {/* Blank Selection Card */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl text-center shadow-md relative overflow-hidden">
            <div className="absolute right-3 top-3 text-[10px] text-white/50 border border-white/20 rounded px-1.5 font-mono">
              Դատարկ դաշտի լրացում
            </div>
            
            {/* The Sentence with Blank */}
            <p className="text-xl font-mono tracking-wide font-bold italic">
              {activeG2Item.sentenceWithBlank.replace("___", "______")}
            </p>
            
            <div className="my-3 border-t border-dashed border-white/20"></div>
            
            <span className="text-[10px] text-emerald-400 font-bold block mb-1 uppercase">🇦🇲 Հայերեն թարգմանություն</span>
            <p className="text-sm font-semibold text-slate-300">
              {activeG2Item.translation}
            </p>
          </div>

          {/* Option Badges for Game 2 */}
          <div className="grid grid-cols-3 gap-3">
            {activeG2Item.options.map((option, idx) => {
              const isSelected = g2UserChoice === option;
              let btnStyle = "border-slate-200 bg-white text-slate-800 hover:bg-slate-50";
              
              if (g2Answered) {
                if (option === activeG2Item.correctOption) {
                  btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 font-extrabold";
                } else if (isSelected) {
                  btnStyle = "border-rose-400 bg-rose-50 text-rose-800";
                } else {
                  btnStyle = "border-slate-100 bg-white text-slate-400 opacity-60";
                }
              } else if (isSelected) {
                btnStyle = "border-rose-500 bg-rose-50 text-rose-900 border-2 scale-102 shadow-sm animate-pulse";
              }

              return (
                <button
                  id={`g2-option-btn-${idx}`}
                  key={idx}
                  onClick={() => handleGame2SelectAns(option)}
                  disabled={g2Answered}
                  className={`py-3.5 px-4 rounded-xl border-2 font-bold text-sm tracking-wide transition-all text-center cursor-pointer ${btnStyle}`}
                >
                  <span className="text-lg font-mono block mb-0.5">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Action Trigger Area */}
          <div className="min-h-16">
            {!g2Answered ? (
              <button
                id="g2-submit-btn"
                onClick={handleSubmitG2}
                disabled={!g2UserChoice}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-1 shadow cursor-pointer text-xs ${
                  g2UserChoice
                    ? "bg-amber-500 hover:bg-amber-600 text-white font-extrabold"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                Փոխանցել գնդակը 👟⚽
              </button>
            ) : (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 animate-fade-in text-xs font-medium">
                <div className="flex items-center gap-2">
                  {g2IsCorrect ? (
                    <span className="text-emerald-600 font-extrabold flex items-center gap-1 text-sm">
                      🎉 ՃԻՇՏ ՓՈԽԱՆՑՈՒՄ • Գնդակն անցավ դաշնամասով! (+20մ)
                    </span>
                  ) : (
                    <span className="text-rose-600 font-extrabold flex items-center gap-1 text-sm">
                      😢 ԸՆԴՀԱՏՎԱԾ ՓՈԽԱՆՑՈՒՄ • Հակառակորդը խլեց գնդակը:
                    </span>
                  )}
                </div>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Բացատրություն՝</strong> {activeG2Item.explanation}
                </p>
                <button
                  id="g2-next-btn"
                  onClick={handleNextG2}
                  className="w-full mt-2 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Հաջորդ հարցը</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
