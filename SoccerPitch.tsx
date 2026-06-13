import React from "react";
import { Player } from "./types";
import { Trophy, Shield, HelpCircle, Star, Zap, Volume2 } from "lucide-react";

interface SoccerPitchProps {
  playerGor: Player;
  playerGayane: Player;
  currentPlayer: "gor" | "gayane";
  onSelectPlayer: (player: "gor" | "gayane") => void;
  goalAnimation: { active: boolean; player: string };
  totalTrophies: number;
}

export default function SoccerPitch({
  playerGor,
  playerGayane,
  currentPlayer,
  onSelectPlayer,
  goalAnimation,
  totalTrophies
}: SoccerPitchProps) {
  // Let's calculate X coordinate based on player position (0 to 100)
  // Gor is team Blue (starting left 10%, moving right to 85% to score)
  // Gayane is team Pink (starting left 10%, moving right to 85% to score)
  // Let's draw them side-by-side or individually based on current selection
  
  return (
    <div className="bg-emerald-900 border-4 border-emerald-950 p-4 rounded-3xl shadow-xl relative overflow-hidden select-none">
      {/* Soccer Field Lines */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-800 to-emerald-900"></div>
      
      {/* Visual field pattern lines (strips) */}
      <div className="absolute inset-0 flex flex-col justify-between opacity-15 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={`h-[10%] w-full ${i % 2 === 0 ? 'bg-black' : 'bg-transparent'}`} />
        ))}
      </div>
      
      {/* Outer pitch line */}
      <div className="absolute inset-3 border border-white/20 rounded-2xl pointer-events-none"></div>
      
      {/* Center line and circle */}
      <div className="absolute top-1/2 left-3 right-3 h-px bg-white/20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-white/20 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/30 pointer-events-none"></div>

      {/* Goal Area (Right side where they score) */}
      <div className="absolute right-3 top-[30%] bottom-[30%] w-10 border-l border-t border-b border-white/30 rounded-l-md pointer-events-none bg-emerald-950/20"></div>
      <div className="absolute right-1 top-[40%] bottom-[40%] w-2 border border-white/40 bg-white/10 flex items-center justify-center pointer-events-none">
        <span className="text-[10px] text-white/50 origin-center rotate-90 font-mono">GOAL</span>
      </div>

      {/* Goal Area (Left side - baseline starting point) */}
      <div className="absolute left-3 top-[30%] bottom-[30%] w-10 border-r border-t border-b border-white/30 rounded-r-md pointer-events-none bg-emerald-950/10"></div>

      {/* Foreground Content */}
      <div className="relative z-10">
        {/* Scoreboard */}
        <div className="bg-black/50 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-white mb-4 space-y-2.5">
          {/* Match Tournament Title & General Info */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs sm:text-sm">
              <Trophy className="w-4 h-4" /> <span className="tracking-wide">ԱՇԽԱՐՀԻ ԳԱՎԱԹ (WORLD CUP)</span>
            </div>
            <div className="text-[10px] sm:text-xs text-yellow-300 font-bold bg-black/30 px-2 py-0.5 rounded-full border border-yellow-500/20">
              Ընդհանուր՝ {totalTrophies} 🏆
            </div>
          </div>
          
          {/* Active Teams Grid with Live Multiplier Score */}
          <div className="flex items-center justify-between gap-1 sm:gap-3">
            
            {/* Gor Player Info */}
            <button
              id="gors-avatar-select-btn"
              onClick={() => onSelectPlayer("gor")}
              className={`flex-1 flex items-center gap-1.5 p-1 rounded-xl transition-all cursor-pointer text-left ${
                currentPlayer === "gor" ? "bg-amber-500/20 border border-amber-500/50" : "bg-transparent border border-transparent opacity-85 hover:opacity-100"
              }`}
            >
              <div className="relative shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500 flex items-center justify-center border-2 border-white shadow-md text-lg">
                  👦
                </div>
                <span className="absolute -bottom-1 -right-1 bg-blue-600 text-[8px] px-1 rounded-full text-white font-bold">
                  Գոռ
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-[11px] sm:text-xs font-bold text-blue-200 truncate">Գոռ</div>
                <div className="text-[9px] sm:text-xs text-gray-300 font-mono">
                  🥅 {playerGor.goals} Գոլ • ⭐ {playerGor.score}
                </div>
              </div>
            </button>

            {/* Central score indicator */}
            <div className="px-2.5 py-1.5 bg-black/40 rounded-xl text-center font-mono font-extrabold text-sm sm:text-xl tracking-widest text-white border border-white/5 shrink-0">
              {playerGor.goals} : {playerGayane.goals}
            </div>

            {/* Gayane Player Info */}
            <button
              id="gayanes-avatar-select-btn"
              onClick={() => onSelectPlayer("gayane")}
              className={`flex-1 flex items-center justify-end gap-1.5 p-1 rounded-xl transition-all cursor-pointer text-right ${
                currentPlayer === "gayane" ? "bg-amber-500/20 border border-amber-500/50" : "bg-transparent border border-transparent opacity-85 hover:opacity-100"
              }`}
            >
              <div className="min-w-0 text-right">
                <div className="text-[11px] sm:text-xs font-bold text-rose-200 truncate">Գայանե</div>
                <div className="text-[9px] sm:text-xs text-gray-300 font-mono">
                  🥅 {playerGayane.goals} Գոլ • ⭐ {playerGayane.score}
                </div>
              </div>
              <div className="relative shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rose-500 flex items-center justify-center border-2 border-white shadow-md text-lg">
                  👧
                </div>
                <span className="absolute -bottom-1 -right-1 bg-rose-600 text-[8px] px-1 rounded-full text-white font-bold">
                  Գայանե
                </span>
              </div>
            </button>

          </div>
        </div>

        {/* Dynamic Turf Runner Game Field Screen */}
        <div className="h-44 relative border border-white/10 rounded-2xl overflow-hidden mt-2 bg-emerald-950/20">
          
          {/* Starting line flag */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
            <span className="text-xs">🏁</span>
            <span className="text-[8px] text-white/50 bg-black/40 px-1 rounded">Սկիզբ</span>
          </div>

          {/* Target Goal visual indicator */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
            <div className="text-lg animate-bounce">⚽</div>
            <span className="text-[8px] text-amber-300 bg-black/60 px-1 rounded font-bold">ԳՈԼ</span>
          </div>

          {/* Running Track 1 - Gor (Blue) */}
          <div className="absolute top-[20%] left-0 right-0 h-12 flex items-center">
            {/* Horizontal progress bar */}
            <div className="absolute left-10 right-10 h-1 bg-white/10 rounded-full">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-500 relative"
                style={{ width: `${playerGor.position}%` }}
              >
                {/* Visual trail sparkles */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full blur-sm opacity-50"></div>
              </div>
            </div>

            {/* Gor Player Object */}
            <div 
              className="absolute transition-all duration-500 flex flex-col items-center justify-center pointer-events-none z-20"
              style={{ left: `calc(30px + ${playerGor.position * 0.75}%)` }}
            >
              <div className={`p-1 rounded-full shadow-lg border-2 ${
                currentPlayer === "gor" ? "bg-amber-400 border-white scale-110 ring-4 ring-yellow-400/30" : "bg-blue-600 border-blue-400"
              } transition-transform`}>
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-lg soccer-bounce">
                  👦
                </div>
              </div>
              <span className="text-[9px] bg-black/60 text-blue-200 px-1 rounded font-bold mt-1 shadow">
                Գոռ ({playerGor.position}m)
              </span>
            </div>
          </div>

          {/* Running Track 2 - Gayane (Pink/Rose) */}
          <div className="absolute top-[55%] left-0 right-0 h-12 flex items-center">
            {/* Horizontal progress bar */}
            <div className="absolute left-10 right-10 h-1 bg-white/10 rounded-full">
              <div 
                className="h-full bg-rose-500 rounded-full transition-all duration-500 relative"
                style={{ width: `${playerGayane.position}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-rose-400 rounded-full blur-sm opacity-50"></div>
              </div>
            </div>

            {/* Gayane Player Object */}
            <div 
              className="absolute transition-all duration-500 flex flex-col items-center justify-center pointer-events-none z-20"
              style={{ left: `calc(30px + ${playerGayane.position * 0.75}%)` }}
            >
              <div className={`p-1 rounded-full shadow-lg border-2 ${
                currentPlayer === "gayane" ? "bg-amber-400 border-white scale-110 ring-4 ring-yellow-400/30" : "bg-rose-600 border-rose-400"
              } transition-transform`}>
                <div className="w-8 h-8 rounded-full bg-rose-400 flex items-center justify-center text-lg soccer-bounce">
                  👧
                </div>
              </div>
              <span className="text-[9px] bg-black/60 text-rose-200 px-1 rounded font-bold mt-1 shadow">
                Գայանե ({playerGayane.position}m)
              </span>
            </div>
          </div>

          {/* Celebratory Goal Screen Overlay */}
          {goalAnimation.active && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-30 transition-all duration-300 animate-fade-in animate-scale">
              <div className="text-5xl animate-bounce">⚽🔥</div>
              <h3 className="text-3xl font-extrabold text-yellow-400 tracking-widest uppercase">
                ԳՈ՜Ո՜Ո՜Լ
              </h3>
              <p className="text-white text-sm font-bold mt-1">
                {goalAnimation.player === "gor" ? "ԳՈՌԸ" : "ԳԱՅԱՆԵՆ"} պատասխանեց ճիշտ և խփեց ԳՈԼ: 🥅
              </p>
              <div className="mt-3 flex items-center gap-1 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                <Trophy className="w-4 h-4" /> <span>+1 ԱՇԽԱՐՀԻ ԳԱՎԱԹ 🏆</span>
              </div>
            </div>
          )}

        </div>

        {/* Informational Coach Helper Prompt */}
        <div className="mt-2 text-[11px] text-emerald-200 flex items-center gap-1.5 justify-center bg-emerald-950/40 py-1.5 px-3 rounded-lg">
          <span className="text-sm">👨‍🏫</span>
          <span>
            <strong>Կանոն՝</strong> Ճիշտ պատասխանելիս քո խաղացողն առաջ է շարժվում 20 մետրով: 100 մետրի հասնելիս խփում ես <strong>ԳՈԼ</strong> և ստանում Աշխարհի Գավաթ!
          </span>
        </div>
      </div>
    </div>
  );
}
