import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function SlotPlayer({ balance, gameStatus, isSpinning, reels, handleSpin }) {
  
  const stripSimbolVisual = ['🍒', '💎', '⭐', '🔔', '🍉', '🍋', '🍒', '💎', '⭐', '🔔'];
  const isJackpot = !isSpinning && reels.every(s => s === '💎');
  
  const spinAudioRef = useRef(null);

  useEffect(() => {
    spinAudioRef.current = new Audio('/music/spin.weba'); 
    spinAudioRef.current.loop = true; 

    return () => {
      if (spinAudioRef.current) {
        spinAudioRef.current.pause();
        spinAudioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isSpinning) {
      if (spinAudioRef.current) {
        spinAudioRef.current.currentTime = 0;
        spinAudioRef.current.play().catch(() => {});
      }
    } else {
      if (spinAudioRef.current) {
        spinAudioRef.current.pause();
      }
    }
  }, [isSpinning]);

  useEffect(() => {
    if (isJackpot) {
      const winAudio = new Audio('/music/win.mp3');
      winAudio.play().catch(() => {});

      if (window.navigator.vibrate) {
        window.navigator.vibrate([500, 100, 500, 100, 500]);
      }

      const end = Date.now() + 3000;
      const frame = () => {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#fbbf24', '#f59e0b'] });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#fbbf24', '#f59e0b'] });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [isJackpot]);

  const cssAnimasiMurni = `
    @keyframes murniSlotRoll {
      0% { transform: translateY(-70%); }
      100% { transform: translateY(0%); }
    }
    .animasi-menggelinding-bawah {
      animation: murniSlotRoll 0.15s linear infinite !important;
    }
  `;

  return (
    <div className="w-full relative">
      <style>{cssAnimasiMurni}</style>
      <AnimatePresence>
        {isJackpot && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: [0, 0.5, 0] }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, repeat: Infinity }}
            className="absolute inset-0 z-20 bg-yellow-400/20 rounded-3xl pointer-events-none"
          />
        )}
      </AnimatePresence>
      <motion.div 
        animate={isJackpot ? { 
          boxShadow: ["0 0 20px #fbbf24", "0 0 80px #f59e0b", "0 0 20px #fbbf24"],
          borderColor: "#fbbf24" 
        } : { borderColor: "#3f3f46" }}
        transition={{ duration: 0.3, repeat: isJackpot ? Infinity : 0 }}
        className="rounded-3xl border bg-zinc-900/90 p-6 backdrop-blur-sm relative overflow-hidden"
      >
        <div className="text-left mb-6 border-b border-zinc-800 pb-4">
          <p className="text-[10px] uppercase font-bold text-zinc-500">Saldo Tersedia</p>
          <motion.h2 
            animate={isJackpot ? { scale: [1, 1.1, 1] } : {}} 
            className="text-2xl ml-5 font-black text-yellow-400 font-mono"
          >
            Rp {balance.toLocaleString('id-ID')}
          </motion.h2>
        </div>
        <div className="relative grid grid-cols-3 gap-4 bg-zinc-950 p-4 rounded-2xl border border-zinc-850 shadow-inner overflow-hidden">
          <div className="absolute inset-y-0 left-0 right-0 my-auto h-16 bg-orange-500/[0.05] border-y border-orange-500/20 pointer-events-none z-10"></div>
          
          {reels.map((simbol, index) => (
            <div key={index} className="relative h-32 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center overflow-hidden">
              <motion.div 
                className={`flex flex-col items-center gap-6 ${isSpinning ? 'animasi-menggelinding-bawah' : ''}`}
                animate={isJackpot ? { scale: [1, 1.25, 1], rotate: [0, 8, -8, 0] } : {}}
              >
                {isSpinning ? 
                  stripSimbolVisual.map((item, i) => <span key={i} className="text-4xl">{item}</span>) :
                  <span className="text-5xl">{simbol}</span>
                }
              </motion.div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-zinc-950 rounded-xl border border-zinc-850 text-center">
           <p className={`text-xs font-medium ${isJackpot ? 'text-yellow-400 font-black' : 'text-zinc-300'}`}>
            {isSpinning ? 'MENYINKRONKAN ALGORITMA SERVER...' : (isJackpot ? '!!! MAXWIN JACKPOT !!!' : gameStatus)}
           </p>
        </div>
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className={`w-full mt-4 py-4 rounded-2xl font-black text-white uppercase tracking-widest transition-all shadow-lg ${
            isSpinning 
            ? 'bg-zinc-800 cursor-not-allowed opacity-50' 
            : 'bg-gradient-to-r from-orange-500 to-amber-600 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isSpinning ? 'MEMUTAR (10s)...' : 'Putar Mesin'}
        </button>
      </motion.div>
    </div>
  );
}