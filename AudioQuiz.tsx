import React, { useState, useEffect } from "react";
import { AudioGameQuestion } from "./types";
import { audioGameQuestions } from "./data";
import { Volume2, VolumeX, Play, RotateCcw, CheckCircle, XCircle, ArrowRight, Trophy, HelpCircle } from "lucide-react";

interface AudioQuizProps {
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
  currentPlayerName: string;
}

export default function AudioQuiz({ onCorrectAnswer, onIncorrectAnswer, currentPlayerName }: AudioQuizProps) {
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [audioCompleted, setAudioCompleted] = useState<boolean>(false);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  
  const currentAudioGame: AudioGameQuestion = audioGameQuestions[currentLevel];

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSpeechSupported(false);
    }
    // Cancel any previous speaking on unmount
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlayVoice = () => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    setIsPlaying(true);

    const utterance = new SpeechSynthesisUtterance(currentAudioGame.audioText);
    utterance.lang = "es-ES";
    utterance.rate = 0.8; // Kids safe speech rate
    
    // Fallback timer if onend event not triggered
    const fallbackTimer = setTimeout(() => {
      setIsPlaying(false);
    }, 7000);

    utterance.onend = () => {
      setIsPlaying(false);
      clearTimeout(fallbackTimer);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      clearTimeout(fallbackTimer);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleOptionClick = (option: string) => {
    if (answered) return;
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || answered) return;

    const currentQuestion = currentAudioGame.questions[currentQuestionIndex];
    const correct = selectedOption === currentQuestion.correctOption;
    
    setIsCorrect(correct);
    setAnswered(true);

    if (correct) {
      onCorrectAnswer();
    } else {
      onIncorrectAnswer();
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setAnswered(false);
    setIsCorrect(null);

    if (currentQuestionIndex < currentAudioGame.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Completed all 3 questions of this audio level
      if (!completedLevels.includes(currentLevel)) {
        setCompletedLevels([...completedLevels, currentLevel]);
      }
      setAudioCompleted(true);
    }
  };

  const handleResetLevel = () => {
    setSelectedOption(null);
    setAnswered(false);
    setIsCorrect(null);
    setCurrentQuestionIndex(0);
    setAudioCompleted(false);
  };

  const handleSelectLevel = (index: number) => {
    setCurrentLevel(index);
    setSelectedOption(null);
    setAnswered(false);
    setIsCorrect(null);
    setCurrentQuestionIndex(0);
    setAudioCompleted(false);
  };

  const activeQuestion = currentAudioGame.questions[currentQuestionIndex];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-emerald-100 max-w-4xl mx-auto">
      
      {/* Audio Level Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {audioGameQuestions.map((q, idx) => {
          const isCompleted = completedLevels.includes(idx);
          const isActive = idx === currentLevel;
          return (
            <button
              id={`audio-level-tab-${idx}`}
              key={q.id}
              onClick={() => handleSelectLevel(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                isActive
                  ? "bg-amber-500 text-white shadow-md scale-105"
                  : isCompleted
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <span>🔊 Լսարան {idx + 1}</span>
              {isCompleted && <span className="text-[10px]">🏆</span>}
            </button>
          );
        })}
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: The Player & The Audio Player */}
        <div className="md:col-span-5 bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-5 rounded-2xl border border-emerald-200/60 flex flex-col items-center text-center justify-between">
          <div className="w-full">
            <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
              Աուդիո Խաղ • {currentLevel + 1}/5
            </span>
            <h3 className="text-lg font-bold text-slate-800 mt-2">
              {currentAudioGame.title}
            </h3>
          </div>

          {/* Animated Waveform when playing voice */}
          <div className="my-6 relative flex items-center justify-center">
            <div className={`w-28 h-28 rounded-full flex items-center justify-center border-4 border-emerald-400 bg-white shadow-lg transition-transform duration-300 ${isPlaying ? 'scale-110' : ''}`}>
              <span className="text-4xl">📢</span>
            </div>
            
            {isPlaying && (
              <div className="absolute inset-x-0 -bottom-3 flex justify-center gap-1">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full animate-pulse my-auto"></span>
                <span className="w-1.5 h-8 bg-emerald-500 rounded-full animate-bounce my-auto"></span>
                <span className="w-1.5 h-10 bg-emerald-500 rounded-full animate-pulse my-auto"></span>
                <span className="w-1.5 h-8 bg-emerald-500 rounded-full animate-bounce my-auto"></span>
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full animate-pulse my-auto"></span>
              </div>
            )}
          </div>

          <div className="w-full space-y-3">
            <button
              id="play-audio-btn"
              onClick={handlePlayVoice}
              className={`w-full py-2.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                isPlaying 
                  ? "bg-amber-500 text-white animate-pulse" 
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              <Volume2 className="w-5 h-5 animate-bounce" />
              <span>{isPlaying ? "Լսում ենք..." : "Միացնել իսպաներեն աուդիոն"}</span>
            </button>

            {!speechSupported && (
              <p className="text-[10px] text-red-500 font-medium">
                ⚠️ Բրաուզերում խոսքի սինթեզի ձայնը չի աջակցվում:
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Quiz Section */}
        <div className="md:col-span-7 flex flex-col justify-between">
          {!audioCompleted ? (
            <div className="space-y-4">
              {/* Question Progress bar */}
              <div className="flex justify-between items-center text-xs text-slate-500 font-bold">
                <span>Հարց {currentQuestionIndex + 1} / {currentAudioGame.questions.length}</span>
                <span className="text-emerald-600">Հերթափոխ՝ {currentPlayerName}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / currentAudioGame.questions.length) * 100}%` }}
                ></div>
              </div>

              {/* The Question in Armenian */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex gap-2 items-start">
                  <span className="text-2xl mt-0.5">❓</span>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm leading-snug">
                      {activeQuestion.questionText}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Լսեք ձայնագրությունը՝ ճիշտ պատասխանը գտնելու համար:
                    </p>
                  </div>
                </div>
              </div>

              {/* Options list */}
              <div className="space-y-2">
                {activeQuestion.options.map((option, idx) => {
                  const isCurSelected = selectedOption === option;
                  let optionStyle = "border-slate-200 bg-white text-slate-700 hover:bg-slate-50";
                  
                  if (answered) {
                    if (option === activeQuestion.correctOption) {
                      optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold";
                    } else if (isCurSelected) {
                      optionStyle = "border-rose-400 bg-rose-50 text-rose-800";
                    } else {
                      optionStyle = "border-slate-100 bg-white text-slate-400 opacity-60";
                    }
                  } else if (isCurSelected) {
                    optionStyle = "border-amber-500 bg-amber-50/50 text-amber-900 border-2";
                  }

                  return (
                    <button
                      id={`audio-option-btn-${idx}`}
                      key={idx}
                      onClick={() => handleOptionClick(option)}
                      disabled={answered}
                      className={`w-full text-left p-3.5 rounded-xl border-2 text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{option}</span>
                        {answered && activeQuestion.optionTranslations?.[idx] && (
                          <span className={`text-[11px] font-medium transition-all px-2 py-0.5 rounded-md ${
                            option === activeQuestion.correctOption 
                              ? 'bg-emerald-100 text-emerald-800 animate-fade-in' 
                              : isCurSelected 
                                ? 'bg-rose-100 text-rose-800 animate-fade-in' 
                                : 'bg-slate-100/80 text-slate-500'
                          }`}>
                            {activeQuestion.optionTranslations[idx]}
                          </span>
                        )}
                      </span>
                      {answered && option === activeQuestion.correctOption && (
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      )}
                      {answered && isCurSelected && option !== activeQuestion.correctOption && (
                        <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Continue Section */}
              <div className="min-h-16 pt-2">
                {!answered ? (
                  <button
                    id="submit-audio-answer-btn"
                    onClick={handleSubmitAnswer}
                    disabled={!selectedOption}
                    className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1 shadow cursor-pointer ${
                      selectedOption
                        ? "bg-amber-500 hover:bg-amber-600 text-white font-extrabold"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    Ստուգել պատասխանը
                  </button>
                ) : (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 animate-fade-in">
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                          🎉 ՃԻՇՏ Է! +20մետր Գոռին/Գայանեին
                        </span>
                      ) : (
                        <span className="text-rose-600 font-bold text-xs flex items-center gap-1">
                          😢 ՍԽԱԼ Է • Փորձիր հաջորդը
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-normal">
                      <strong>Բացատրություն՝</strong> {activeQuestion.explanation}
                    </p>
                    <button
                      id="next-question-btn"
                      onClick={handleNextQuestion}
                      className="w-full mt-2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shadow cursor-pointer"
                    >
                      <span>Շարունակել</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Completed Level State */
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 bg-emerald-50/50 rounded-2xl border border-emerald-200">
              <div className="text-5xl animate-bounce">🏆🙌</div>
              <h3 className="text-xl font-bold text-emerald-800">
                Մակարդակի Ավարտ!
              </h3>
              <p className="text-xs text-slate-600 max-w-sm">
                Շնորհավորո՛ւմ ենք, դուք հաջողությամբ պատասխանեցիք այս աուդիո խաղի հարցին և օգնեցիք ձեր ֆուտբոլիստներին առաջ շարժվել դաշտում:
              </p>
              
              <div className="flex w-full gap-2 pt-3">
                <button
                  id="reset-audio-level-btn"
                  onClick={handleResetLevel}
                  className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Կրկնել</span>
                </button>
                
                {currentLevel < audioGameQuestions.length - 1 ? (
                  <button
                    id="next-audio-level-btn"
                    onClick={() => handleSelectLevel(currentLevel + 1)}
                    className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1 shadow-md cursor-pointer"
                  >
                    <span>Հաջորդ Աուդիո Խաղը</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex-1 font-bold text-xs text-amber-500 bg-amber-50 rounded-xl flex items-center justify-center p-2.5 border border-amber-200">
                    👑 Բոլոր աուդիո խաղերը ավարտված են:
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
