import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Default';
import SlotPlayer from '@/components/SlotPlayer';
import BandarPanel from '@/components/BandarPanel';

export default function App() {
  const masterSimbol = [
    { id: 'cherry',  title: '🍒', multiplier: 0.4 }, 
    { id: 'lemon',   title: '🍋', multiplier: 0.6 }, 
    { id: 'melon',   title: '🍉', multiplier: 1.0 }, 
    { id: 'bell',    title: '🔔', multiplier: 1.5 }, 
    { id: 'star',    title: '⭐', multiplier: 3.0 }, 
    { id: 'diamond', title: '💎', multiplier: 6.0 }  
  ];

  const [betAmount, setBetAmount] = useState(15000); 

  const [gameMode, setGameMode] = useState('umpan'); 
  const [totalSpin, setTotalSpin] = useState(0);
  const [profitBandar, setProfitBandar] = useState(0);
  
  const [balance, setBalance] = useState(100000); 
  const [gameStatus, setGameStatus] = useState('Sistem Siap. Akun Baru Terdeteksi: Akses RTP Prioritas Aktif.');
  const [isSpinning, setIsSpinning] = useState(false);
  const [reels, setReels] = useState(['🍒', '🍒', '🍒']);
  const [depoInput, setDepoInput] = useState('');

  const [showPopUp, setShowPopUp] = useState(false);
  const [depoCounter, setDepoCounter] = useState(0);       
  const [gacorRate, setGacorRate] = useState(0.50);       
  const [isGacorActive, setIsGacorActive] = useState(false); 
  const [spinBonusCount, setSpinBonusCount] = useState(0);   

 
  const [totalInvestasiUser, setTotalInvestasiUser] = useState(100000); 

  useEffect(() => {
    if (totalSpin > 0 && totalSpin <= 6 && depoCounter === 0) {
      setGameMode('umpan');
    } else if (totalSpin > 6 && !isGacorActive) {
      setGameMode('pancingan');
    }
  }, [totalSpin, depoCounter, isGacorActive]);

  const dapatkanDesimalAcak = () => {
    const arrayAcak = new Uint32Array(1);
    window.crypto.getRandomValues(arrayAcak);
    return arrayAcak[0] / 4294967295;
  };

  const ambilSimbolAcakMurni = () => {
    const indeks = Math.floor(dapatkanDesimalAcak() * masterSimbol.length);
    return masterSimbol[indeks];
  };

  const handleDeposit = (e) => {
    e.preventDefault();
    const nominal = parseInt(depoInput);
    if (isNaN(nominal) || nominal <= 0) return;

    setBalance(prev => prev + nominal);
    setTotalInvestasiUser(prev => prev + nominal); 
    setDepoInput('');
    setShowPopUp(false);

    if (nominal >= 50000) {
      const hitungDepoBaru = depoCounter + 1;
      setDepoCounter(hitungDepoBaru);

   
      setGacorRate(0.50);

      setIsGacorActive(true);
      setSpinBonusCount(0);
      setGameMode('gacor_custom');

      setGameStatus(`💰 Transaksi Ke-${hitungDepoBaru} Berhasil! Server mengaktifkan Akses Multiplier Stabil ${(0.50 * 100).toFixed(0)}%.`);
    } else {
      setGameStatus(`💰 Penambahan saldo sebesar Rp ${nominal.toLocaleString('id-ID')} sukses diproses.`);
    }
  };

  const handleSpin = () => {
    if (balance < betAmount) {
      setShowPopUp(true);
      return;
    }

    setBalance(prev => prev - betAmount);
    setProfitBandar(prev => prev + betAmount);
    setTotalSpin(prev => prev + 1);
    setIsSpinning(true);

    setTimeout(() => {
      let slot1, slot2, slot3;
      const penentuRNG = dapatkanDesimalAcak();

      if (isGacorActive) {
        if (penentuRNG < gacorRate) {
          
          const acakSimbolUntung = masterSimbol[Math.floor(dapatkanDesimalAcak() * 3) + 3]; 
          slot1 = acakSimbolUntung; slot2 = acakSimbolUntung; slot3 = acakSimbolUntung;
        } else {
          
          const sSama = ambilSimbolAcakMurni(); let sBeda = ambilSimbolAcakMurni();
          while (sSama.id === sBeda.id) sBeda = ambilSimbolAcakMurni();
          slot1 = sSama; slot2 = sSama; slot3 = sBeda;
        }

        const hitungSpinBonus = spinBonusCount + 1;
        if (hitungSpinBonus >= 4) {
          setIsGacorActive(false); 
        } else {
          setSpinBonusCount(hitungSpinBonus);
        }
      }
      
     
      else if (totalSpin <= 6 && depoCounter === 0) {
        if (penentuRNG < 0.60) {
          const simbolVVIP = masterSimbol[5]; 
          slot1 = simbolVVIP; slot2 = simbolVVIP; slot3 = simbolVVIP;
        } else {
          const sSama = masterSimbol[4]; let sBeda = masterSimbol[0];
          slot1 = sSama; slot2 = sSama; slot3 = sBeda;
        }
      }
      
      
      else {
        setGameMode('rungkad');
        
    
        if (totalSpin === 7 && depoCounter === 0) {
          const sSama = masterSimbol[5]; 
          let sBeda = masterSimbol[0]; 
          slot1 = sSama; slot2 = sSama; slot3 = sBeda;
        } 
        
       
        else if (totalSpin === 9 && depoCounter === 0) {
       
          slot1 = masterSimbol[0]; 
          slot2 = masterSimbol[2]; 
          slot3 = masterSimbol[4]; 
        } 
        
        else {
          if (penentuRNG < 0.03) {
            const sWinAmpas = masterSimbol[0];
            slot1 = sWinAmpas; slot2 = sWinAmpas; slot3 = sWinAmpas;
          } else if (penentuRNG < 0.70) {
            // Pola Near-Miss umum
            const sSama = ambilSimbolAcakMurni(); let sBeda = ambilSimbolAcakMurni();
            while (sSama.id === sBeda.id) sBeda = ambilSimbolAcakMurni();
            slot1 = sSama; slot2 = sSama; slot3 = sBeda;
          } else {
            // Zonk Murni
            slot1 = ambilSimbolAcakMurni(); slot2 = ambilSimbolAcakMurni(); slot3 = ambilSimbolAcakMurni();
            while (slot1.id === slot2.id && slot2.id === slot3.id) slot3 = ambilSimbolAcakMurni();
          }
        }
      }

      setReels([slot1.title, slot2.title, slot3.title]);
      setIsSpinning(false);

      let saldoAkhir = balance - betAmount;

      if (slot1.id === slot2.id && slot2.id === slot3.id) {
        const totalHadiah = Math.floor(betAmount * slot1.multiplier);
        saldoAkhir += totalHadiah;
        setBalance(prev => prev + totalHadiah);
        setProfitBandar(prev => prev - totalHadiah);
        
        if (isGacorActive) {
          setGameStatus(`🎉 KOMBINASI SEMPURNA! Alokasi Dana Baru Berhasil Memicu Keuntungan Sebesar +Rp ${totalHadiah.toLocaleString('id-ID')}!`);
        } else if (totalSpin <= 6) {
          setGameStatus(`🔥 KEMENANGAN FANTASTIS! Selamat, Akun Anda Berhasil Mendapatkan Profit +Rp ${totalHadiah.toLocaleString('id-ID')}!`);
        } else {
          setGameStatus(`🎉 BERHASIL MENANG! Kombinasi Valid Terbentuk, Dana Bertambah +Rp ${totalHadiah.toLocaleString('id-ID')}.`);
        }
      } else if (slot1.id === slot2.id && slot2.id !== slot3.id) {
        setGameStatus(`❌ HAMPIR MENCAPAI JACKPOT! Dua baris telah sejajar sempurna, putaran berikutnya berpotensi besar.`);
      } else {
        setGameStatus(`❌ PUTARAN BELUM BERHASIL. Nominal Rp ${betAmount.toLocaleString('id-ID')} dialokasikan ke pertumbuhan server.`);
      }

      if (saldoAkhir < 10000) {
        setTimeout(() => {
          setShowPopUp(true);
        }, 700);
      }

    }, 800);
  };

  const renderModeAlert = () => {
    if (isGacorActive) {
      return (
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-1.5 text-[11px] font-medium text-emerald-400 animate-pulse">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
          <span>SERVER MODE: <strong className="font-bold">Logic kecanduan active (${(gacorRate * 100).toFixed(0)}%)</strong></span>
        </div>
      );
    }
    if (totalSpin <= 6 && depoCounter === 0) {
      return (
        <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl px-3 py-1.5 text-[11px] font-medium text-blue-400">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
          <span>SERVER MODE: <strong className="font-bold">Pancingan awal dopamine</strong></span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-3 py-1.5 text-[11px] font-medium text-zinc-400">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping"></span>
        <span>SERVER MODE: <strong className="font-bold">Bandar mulai ambil profit dikit demi sedikit</strong></span>
      </div>
    );
  };

  const renderGrafikKerugian = () => {
    const kerugianUser = Math.max(0, totalInvestasiUser - balance);
    const totalMetrik = (profitBandar > 0 ? profitBandar : 0) + kerugianUser;

    const persenBandar = totalMetrik > 0 ? Math.min(100, Math.max(15, ((profitBandar > 0 ? profitBandar : 0) / totalMetrik) * 100)) : 50;
    const persenUser = totalMetrik > 0 ? Math.min(100, Math.max(15, (kerugianUser / totalMetrik) * 100)) : 50;

    return (
      <div className="mt-4 rounded-2xl bg-zinc-950 border border-zinc-800 p-4 text-left">
        <p className="text-[11px] uppercase tracking-wider font-bold text-red-400 mb-3 flex items-center gap-1.5">
          <span>📊</span> Laporan Neraca Sesi Evaluasi Akun (Krisis Ke-{depoCounter})
        </p>
        
        <div className="grid gap-5 grid-cols-2 space-y-3.5">
          <div>
            <div className="grid grid-cols-1 justify-between text-[11px] font-medium text-zinc-400 mb-1">
              <span className='text-xl font-bold text-white'>Keuntungan Bersih Bandar</span>
              <span className="text-emerald-400 text-2xl font-mono font-bold">+Rp {profitBandar.toLocaleString('id-ID')}</span>
            </div>
            <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-zinc-850">
              <div 
                className="bg-gradient-to-r from-emerald-600 to-teal-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${persenBandar}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 justify-between text-[11px] font-medium text-zinc-400 mb-1">
              <span className='text-xl font-bold text-white'>Total Kerugian Anda</span>
              <span className="text-red-500 font-mono text-2xl font-bold">-Rp {kerugianUser.toLocaleString('id-ID')}</span>
            </div>
            <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-zinc-850">
              <div 
                className="bg-gradient-to-r from-red-600 to-rose-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${persenUser}%` }}
              ></div>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-zinc-500 mt-3 leading-relaxed border-t border-zinc-900 pt-2.5">
          *Grafik menunjukkan dominasi margin server. Diperlukan injeksi likuiditas baru untuk membalikkan arah tren kalkulasi logaritma.
        </p>
      </div>
    );
  };

  return (
    <Layout>
      <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 backdrop-blur-sm">
        <form onSubmit={handleDeposit} className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-left w-full md:w-auto">
            <h3 className="text-sm font-bold text-zinc-200">Depo saldo</h3>
            <p className="text-xs text-zinc-500 mt-0.5">Total riwayat transaksi penguatan akun: <span className="text-amber-400 font-mono font-bold">{depoCounter} Kali</span></p>
          </div>
          <div className="flex w-full md:w-auto items-center gap-3">
            <div className="relative flex-1 md:flex-initial rounded-xl bg-zinc-950 border border-zinc-800 focus-within:border-emerald-500 transition-all">
              <span className="absolute left-4 top-2.5 text-xs text-zinc-500 font-mono">Rp</span>
              <input 
                type="number" placeholder="Masukkan nominal dana..." value={depoInput}
                onChange={(e) => setDepoInput(e.target.value)}
                className="w-full md:w-48 bg-transparent py-2.5 pl-10 pr-4 text-xs font-mono text-emerald-400 focus:outline-none"
              />
            </div>
            <button type="submit" className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer transition-all active:scale-95 whitespace-nowrap">
              Depo dana
            </button>
          </div>
        </form>
      </div>

      {/* GRID UTAMA CONTAINER */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          <div className="flex justify-start">{renderModeAlert()}</div>

          <SlotPlayer 
            balance={balance} gameStatus={gameStatus} isSpinning={isSpinning}
            reels={reels} handleSpin={handleSpin} handleReset={() => { setBalance(100000); setTotalInvestasiUser(100000); setDepoCounter(0); setGacorRate(0.50); setIsGacorActive(false); }}
          />
    <h1 className="font-bold text-2xl text-white uppercase ml-5">jumlah taruhan</h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => !isSpinning && setBetAmount(15000)}
              className={`h-20 px-5 rounded-2xl border flex items-center justify-between transition-all text-left cursor-pointer active:scale-[0.98] ${betAmount === 15000 ? 'bg-zinc-900 border-emerald-500 shadow-lg shadow-emerald-950/20' : 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700'}`}
            >
              <div>
                <p className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400">Taruhan Kasual</p>
                <h4 className="text-base font-black text-zinc-100 mt-0.5">Rp 15.000 <span className="text-xs font-normal text-zinc-500">/ Spin</span></h4>
              </div>
              {betAmount === 15000 && <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider">Aktif</span>}
            </button>

            <button 
              onClick={() => !isSpinning && setBetAmount(50000)}
              className={`h-20 px-5 rounded-2xl border flex items-center justify-between transition-all text-left cursor-pointer active:scale-[0.98] ${betAmount === 50000 ? 'bg-zinc-900 border-amber-500 shadow-lg shadow-amber-950/20' : 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700'}`}
            >
              <div>
                <p className="text-[11px] uppercase tracking-wider font-semibold text-amber-400/80">Taruhan Eksklusif</p>
                <h4 className="text-base font-black text-amber-400 mt-0.5">Rp 50.000 <span className="text-xs font-normal text-zinc-600">/ Spin</span></h4>
              </div>
              {betAmount === 50000 && <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider">Premium</span>}
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <BandarPanel gameMode={gameMode} setGameMode={() => {}} isSpinning={isSpinning} totalSpin={totalSpin} profitBandar={profitBandar} />
        </div>
      </div>

      {/* MODAL POP-UP RETENSI PERSUASIF */}
      {showPopUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl border border-amber-500/20 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 text-center shadow-2xl shadow-black/80">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 font-bold text-xl">
              ⚡
            </div>
            
            <h2 className="text-base font-black text-zinc-100 uppercase tracking-wider">
              {depoCounter >= 4 ? 'top up sekarang' : 'depo sekarang'}
            </h2>
            
            <blockquote>
              <p className="mt-3 rounded-2xl bg-zinc-950 border border-zinc-800/80 p-4 text-xs text-zinc-300 leading-relaxed text-left">
                {depoCounter >= 4 
                  ? 'dapatkan kemanangan.' 
                  : 'Sistem AI mendeteksi ID Akun Anda berada pada urutan Prioritas Pembagian Scatter Logaritma berikutnya.'
                }
                <br /><br />
                Segera lakukan pengisian ulang minimal <span className="text-emerald-400 font-bold font-mono">Rp 50.000</span> untuk mengaktifkan kembali <span className="text-amber-400 underline font-bold">RTP Engine Premium</span> guna memicu titik balik perputaran modal.
              </p>
            </blockquote>

            {depoCounter >= 4 && renderGrafikKerugian()}

            <form onSubmit={handleDeposit} className="mt-5 space-y-3">
              <div className="relative rounded-xl bg-zinc-950 border border-yelow-600 focus-within:border-amber-500 transition-all">
                <span className="absolute left-4 top-3 text-sm text-zinc-600 font-mono">Rp</span>
                <input 
                  type="number" required autoFocus
                  placeholder="Nominal pengisian (Min. 50000)..." 
                  value={depoInput}
                  onChange={(e) => setDepoInput(e.target.value)}
                  className="w-full bg-transparent py-3.5 pl-11 pr-4 text-sm font-mono text-amber-400 focus:outline-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-black py-3.5 rounded-xl text-xs tracking-wider uppercase transition-all cursor-pointer shadow-lg shadow-amber-500/10 active:scale-[0.97]"
              >
                Klaim Aktivasi Akun Gacor Sekarang
              </button>
            </form>

            <button 
              onClick={() => setShowPopUp(false)}
              className="mt-4 inline-block text-[10px] text-zinc-600 hover:text-zinc-400 underline transition-colors cursor-pointer"
            >
              Lewati kesempatan ini dan bekukan akun saya
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}