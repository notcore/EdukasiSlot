import React from "react";

export default function AlertMarquee() {
  return (
    <div className="w-full bg-zinc-950 border-b border-red-900/40 py-2.5 overflow-hidden flex items-center gap-3">
      <div className="z-10 bg-red-950 border border-red-800/60 px-3 py-1 rounded-md text-xs font-bold text-red-400 flex items-center gap-1.5 ml-4 shrink-0 shadow-sm shadow-red-950/50">
        <span className="animate-pulse">🚨</span> PEMBERITAHUAN:
      </div>
      <div className="w-full overflow-hidden relative flex items-center">
        <div className="animate-[marquee_30s_linear_infinite] whitespace-nowrap flex gap-12 text-sm font-semibold tracking-wide text-zinc-300">
          <span className="flex items-center gap-2">
            ⚠️{" "}
            <span className="bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
              POLA Gacor
            </span>
            Semua pola scatter, jam gacor, dan cheat petir membantumu menang 80%
          </span>
          <span className="flex items-center gap-2">
            🔥{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              FAKTA Pola:
            </span>
            Mesin slot dirancang dengan algoritma RTP dinamis. Anda sengaja
            dibuat menang di awal (fase umpan) agar kecanduan deposit lebih
            besar.
          </span>
          <span className="flex items-center gap-2">
            🛑{" "}
            <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent">
              KENDALI PENUH:
            </span>
            Bandar hanya ingin kamu tetap disini mengambil profit sedikit demi
            sedikit agar kamu kecanduan
          </span>
          <span className="flex items-center gap-2">
            ⚠️{" "}
            <span className="bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
              INFO BANNER:
            </span>
            Gunakan platform simulasi ini untuk melihat bagaimana coding bandar
            menguras habis saldo korban.
          </span>
        </div>
      </div>
    </div>
  );
}
