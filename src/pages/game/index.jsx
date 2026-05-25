import React, { useState } from 'react';
import Layout from '@/Layouts/Default';
import SlotPlayer from '@/components/SlotPlayer';
import BandarPanel from '@/components/BandarPanel';

export default function App() {
  const daftarSimbol = ['🍒', '🍋', '🍉', '⭐', '🔔', '💎'];

  // State Kendali Bandar
  const [gameMode, setGameMode] = useState('umpan');
  const [totalSpin, setTotalSpin] = useState(0);
  const [profitBandar, setProfitBandar] = useState(0);

  // State Game Pemain
  const [balance, setBalance] = useState(500000);
  const betAmount = 50000;
  const [gameStatus, setGameStatus] = useState('Siap Main? Taruhan: Rp 50.000 / Spin');
  const [isSpinning, setIsSpinning] = useState(false);
  
  // Array 3 slot di layar
  const [reels, setReels] = useState(['🍒', '🍒', '🍒']);

  const acakSimbol = () => daftarSimbol[Math.floor(Math.random() * daftarSimbol.length)];

  const handleSpin = () => {
    if (balance < betAmount) {
      setGameStatus('❌ Saldo Anda Habis! Bandar menolak taruhan.');
      return;
    }

    setBalance(prev => prev - betAmount);
    setProfitBandar(prev => prev + betAmount);
    setTotalSpin(prev => prev + 1);
    setIsSpinning(true);
    setGameStatus('Mengalkulasi pola... (Sistem sedang bekerja)');

    // Jalankan efek kocok mekanis selama 800ms
    setTimeout(() => {
      let slot1, slot2, slot3;
      let acak = Math.random();

      // KONDISI 1: FASE UMPAN
      if (gameMode === 'umpan') {
        if (acak < 0.75) { 
          let simbolMenang = acakSimbol();
          slot1 = simbolMenang; slot2 = simbolMenang; slot3 = simbolMenang;
        } else {
          slot1 = acakSimbol(); slot2 = acakSimbol(); slot3 = acakSimbol();
          while (slot1 === slot2 && slot2 === slot3) { slot3 = acakSimbol(); }
        }
      } 
      
      // KONDISI 2: SETINGAN RUNGKAD TOTAL
      else if (gameMode === 'rungkad') {
        slot1 = acakSimbol(); slot2 = acakSimbol(); slot3 = acakSimbol();
        while (slot1 === slot2 && slot2 === slot3) {
          slot3 = acakSimbol();
        }
      } 
      
      // KONDISI 3: PANCINGAN EMOSI
      else if (gameMode === 'pancingan') {
        let simbolSama = acakSimbol();
        let simbolBeda = acakSimbol();
        while (simbolSama === simbolBeda) {
          simbolBeda = acakSimbol();
        }
        slot1 = simbolSama;
        slot2 = simbolSama; 
        slot3 = simbolBeda; 
      }

      setReels([slot1, slot2, slot3]);
      setIsSpinning(false);

      // Kalkulasi Skor Akhir
      if (slot1 === slot2 && slot2 === slot3) {
        const jackpotAmount = betAmount * 5;
        setBalance(prev => prev + jackpotAmount);
        setProfitBandar(prev => prev - jackpotAmount);
        setGameStatus(`🎉 MAXWIN! Jackpot Rp ${jackpotAmount.toLocaleString('id-ID')} (Umpan dopamin sukses!)`);
      } else {
        if (slot1 === slot2 && slot2 !== slot3) {
          setGameStatus('❌ Ahh!! Dikit lagi dapet petir! Sistem mendeteksi rasa penasaran Anda.');
        } else {
          setGameStatus(`❌ Zonk! Uang taruhan Rp ${betAmount.toLocaleString('id-ID')} masuk brankas bandar.`);
        }
      }
    }, 800);
  };

  const handleReset = () => {
    setBalance(500000);
    setTotalSpin(0);
    setProfitBandar(0);
    setGameMode('umpan');
    setReels(['🍒', '🍒', '🍒']);
    setGameStatus('Saldo berhasil diisi ulang. Siap dikuras kembali.');
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <SlotPlayer 
            balance={balance}
            gameStatus={gameStatus}
            isSpinning={isSpinning}
            reels={reels}
            handleSpin={handleSpin}
            handleReset={handleReset}
          />
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <BandarPanel 
            gameMode={gameMode}
            setGameMode={setGameMode}
            isSpinning={isSpinning}
            totalSpin={totalSpin}
            profitBandar={profitBandar}
          />
        </div>
      </div>
    </Layout>
  );
}