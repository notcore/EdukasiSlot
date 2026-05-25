import React from 'react';

export default function BandarPanel({ gameMode, setGameMode, isSpinning, totalSpin, profitBandar }) {
  return (
    <div className="rounded-2xl border border-red-900/30 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 shadow-xl sticky top-24">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
          <h2 className="text-sm font-bold uppercase tracking-wider text-red-400">
            Bandar control Tweak Panel
          </h2>
        </div>
        <span className="text-[10px] bg-red-950 text-red-400 font-mono px-2 py-0.5 rounded border border-red-900/40">
          SECRET BACKOFFICE
        </span>
      </div>

      <div className="space-y-4">
        <div className="space-y-2.5">
          <button 
            onClick={() => !isSpinning && setGameMode('umpan')}
            disabled={isSpinning}
            className={`w-full p-3.5 text-left rounded-xl border transition-all text-xs flex flex-col gap-1 cursor-pointer ${
              gameMode === 'umpan' 
                ? 'border-emerald-500 bg-emerald-950/20 text-emerald-400 font-semibold' 
                : 'border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:bg-zinc-900/50'
            }`}
          >
            <span className={gameMode === 'umpan' ? 'text-emerald-400 font-bold' : 'text-zinc-300'}>
              1. Fase Umpan (Akun Baru Gacor)
            </span>
            <span className="text-zinc-500">Menaikkan bobot Diamond di semua kolom. Korban dijamin Maxwin terus di awal biar napsu.</span>
          </button>

          <button 
            onClick={() => !isSpinning && setGameMode('rungkad')}
            disabled={isSpinning}
            className={`w-full p-3.5 text-left rounded-xl border transition-all text-xs flex flex-col gap-1 cursor-pointer ${
              gameMode === 'rungkad' 
                ? 'border-red-600 bg-red-950/20 text-red-400 font-semibold' 
                : 'border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:bg-zinc-900/50'
            }`}
          >
            <span className={gameMode === 'rungkad' ? 'text-red-400 font-bold' : 'text-zinc-300'}>
              2. Fase Penyedotan (Set Rungkad)
            </span>
            <span className="text-zinc-500">Mengunci probabilitas kolom ke-3 agar tidak memunculkan gambar pemenang. Uang pasti habis.</span>
          </button>

          <button 
            onClick={() => !isSpinning && setGameMode('pancingan')}
            disabled={isSpinning}
            className={`w-full p-3.5 text-left rounded-xl border transition-all text-xs flex flex-col gap-1 cursor-pointer ${
              gameMode === 'pancingan' 
                ? 'border-amber-500 bg-amber-950/20 text-amber-400 font-semibold' 
                : 'border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:bg-zinc-900/50'
            }`}
          >
            <span className={gameMode === 'pancingan' ? 'text-amber-400 font-bold' : 'text-zinc-300'}>
              3. Mode Pancingan (Hampir Menang)
            </span>
            <span className="text-zinc-500">Sengaja menyamakan kolom 1 & 2, tapi kolom 3 dipatahkan secara paksa. Memicu rasa penasaran korban.</span>
          </button>
        </div>

        <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800 space-y-2 mt-4">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            Hasil Rampokan Uang Korban
          </h3>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400">Total Spin:</span>
            <span className="font-semibold font-mono text-zinc-200">{totalSpin} Kali</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400">Net Profit Bandar:</span>
            <span className="font-bold font-mono text-red-400">
              Rp {profitBandar.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}