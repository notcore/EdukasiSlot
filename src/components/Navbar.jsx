import React from 'react';
import LogoSlot from "@/assets/img/icon/logoSlot.png";

export default function Navbar( {className } ) {
  return (
    <nav className={`sticky top-0 z-50 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md ${className || ''}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
              <img src={LogoSlot} className="text-lg font-bold text-red-500"/>
            </div>
            <span className="text-lg font-bold tracking-tight text-zinc-100">
              Slot<span className="bg-gradient-to-t from-orange-300 to-red-600 bg-clip-text text-transparent">Garuda777</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-zinc-900 px-2.5 py-0.5 text-xs font-medium text-zinc-400 border border-zinc-700">
              DEPO 10K AUTO GACOR 2JT
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              edukasi
            </a>
            <div className="h-4 w-px bg-zinc-900"></div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-zinc-400">Local Sandbox</span>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}