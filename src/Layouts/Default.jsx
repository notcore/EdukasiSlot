import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

const Layout = ({ children }) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {

    const timerAwal = setTimeout(() => {
      setShowToast(true);
    }, 1500);

    const intervalSiklus = setInterval(() => {
      setShowToast(true);
    }, 50000);

    return () => {
      clearTimeout(timerAwal);
      clearInterval(intervalSiklus);
    };
  }, []);

  useEffect(() => {
    if (showToast) {
      const timerTutup = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timerTutup);
    }
  }, [showToast]);

  const cssShinyMurni = `
    @keyframes efekKilatEmas {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .teks-emas-shiny {
      background: linear-gradient(90deg, #ffe082, #ffffff, #amber-200, #b59410, #ffe082);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: efekKilatEmas 3s linear infinite;
    }
  `;

  return (
    <div className="bg-zinc-950 relative min-h-screen w-full overflow-x-hidden text-zinc-100 selection:bg-amber-500/30">
      <div className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
        <Navbar />
      </div>

      <style>{cssShinyMurni}</style>

      {/* ── NOTIFIKASI TOAST MELAYANG PREMIUM GOLD EDITION ── */}
      <div
        className={`fixed top-20 right-6 z-50 max-w-md w-full p-[1.5px] rounded-2xl shadow-[0_10px_40px_rgba(181,148,16,0.25)] transition-all duration-500 transform ${
          showToast
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
        }`}
        style={{
          // Background Gradient Emas Mewah Bergerak Berputar/Melengkung
          background:
            "linear-gradient(135deg, #b59410 0%, #f7d046 50%, #806600 100%)",
        }}
      >
        {/* Lapisan Konten Dalam Inner Box */}
        <div className="bg-zinc-900/95 backdrop-blur-md p-5 rounded-[15px] flex items-start gap-4">
          {/* Lencana VVIP Emas */}
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-zinc-950 font-black text-lg shadow-md"
            style={{
              background: "linear-gradient(135deg, #ffe082, #b59410)",
            }}
          >
            👑
          </div>

        
          <div className="text-left flex-1">
            <p className="text-md font-bold text-zinc-200 leading-relaxed mt-1.5 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              anda dapat melakukan penarikan dana ke saldo rekning anda.
            </p>

            <div className="mt-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
              <span className="text-[10px] text-amber-400 font-mono font-black tracking-widest uppercase">
                Jalur Kilat Agen Prioritas Aktif
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowToast(false)}
            className="text-zinc-500 hover:text-amber-400 font-bold text-sm transition-colors cursor-pointer p-0.5"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="px-6 pb-12">{children}</div>
    </div>
  );
};

export default Layout;
