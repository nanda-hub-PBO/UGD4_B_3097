import React from 'react';
import { FaClock, FaMousePointer, FaCheck, FaRedo } from 'react-icons/fa';

// Komponen untuk menampilkan skor permainan dan tombol reset
// Props:
// - moves: jumlah percobaan yang sudah dilakukan
// - timer: waktu bermain dalam format "mm:ss"
// - matchedCount: jumlah pasangan yang sudah berhasil dicocokkan
// - totalPairs: total pasangan kartu yang harus dicocokkan
// - onReset: fungsi untuk mereset permainan
// - isWon: boolean apakah game sudah selesai
function ScoreBoard({ moves, timer, matchedCount, totalPairs, onReset, isWon }) {
    return (
        <div className="text-center mb-8">
            
            {/* 🔥 STATS ROW: Timer | Moves | Matched (disusun horizontal) */}
            <div className="flex justify-center gap-4 mb-6">
                
                {/* ⏱️ TIMER */}
                <div className="bg-slate-800/60 backdrop-blur-md border border-slate-600/50 px-5 py-3 rounded-xl min-w-[120px] hover:bg-slate-700/60 transition-all duration-300 hover:scale-105">
                    <p className="text-xs text-cyan-400 flex items-center justify-center gap-1 mb-1 uppercase tracking-wider font-semibold">
                        <FaClock className="text-cyan-300" /> Waktu
                    </p>
                    <p className="text-3xl font-bold text-white text-center font-mono">{timer || "00:00"}</p>
                </div>
                
                {/* 🔄 MOVES */}
                <div className="bg-slate-800/60 backdrop-blur-md border border-slate-600/50 px-5 py-3 rounded-xl min-w-[120px] hover:bg-slate-700/60 transition-all duration-300 hover:scale-105">
                    <p className="text-xs text-purple-400 flex items-center justify-center gap-1 mb-1 uppercase tracking-wider font-semibold">
                        <FaMousePointer className="text-purple-300" /> Percobaan
                    </p>
                    <p className="text-3xl font-bold text-white text-center">{moves}</p>
                </div>
                
                {/* ✅ MATCHED */}
                <div className="bg-slate-800/60 backdrop-blur-md border border-slate-600/50 px-5 py-3 rounded-xl min-w-[120px] hover:bg-slate-700/60 transition-all duration-300 hover:scale-105">
                    <p className="text-xs text-green-400 flex items-center justify-center gap-1 mb-1 uppercase tracking-wider font-semibold">
                        <FaCheck className="text-green-300" /> Ditemukan
                    </p>
                    <p className="text-3xl font-bold text-white text-center">{matchedCount}/{totalPairs}</p>
                </div>
            </div>

            {/* 🔄 Tombol untuk mereset permainan */}
            <button
                onClick={onReset}
                className="px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-yellow-400/50 flex items-center gap-2 mx-auto transform hover:scale-105 active:scale-95"
            >
                <FaRedo className={isWon ? "animate-spin" : ""} />
                Main Lagi
            </button>
        </div>
    );
}

export default ScoreBoard;