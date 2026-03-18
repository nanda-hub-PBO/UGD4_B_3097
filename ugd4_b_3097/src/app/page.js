"use client";
// Import React dan hook useState untuk mengelola state komponen
import React, { useState, useEffect } from "react";
// import Komponen GameBoard dan ScoreBoard;
import GameBoard from "../components/GameBoard";
import ScoreBoard from "../components/ScoreBoard";
// Import react-icons
import { GiCardJoker } from "react-icons/gi";
import { FaAppleAlt, FaLemon, FaHeart, FaStar, FaSmile, FaMeh, FaSkull } from "react-icons/fa";

// Daftar icon yang digunakan sebagai isi kartu (maks 8 pasang untuk Hard)
const ICONS = [
  { icon: FaAppleAlt, color: "#ef4444" },
  { icon: FaLemon, color: "#eab308" },
  { icon: FaHeart, color: "#ec4899" },
  { icon: FaStar, color: "#f97316" },
  { icon: GiCardJoker, color: "#8b5cf6" },
  { icon: FaSmile, color: "#22c55e" },
  { icon: FaMeh, color: "#3b82f6" },
  { icon: FaSkull, color: "#64748b" },
];

// Konfigurasi difficulty
const DIFFICULTY_CONFIG = {
  easy: { pairs: 4, label: "Easy (4)" },
  medium: { pairs: 6, label: "Medium (6)" },
  hard: { pairs: 8, label: "Hard (8)" },
};

// Fungsi untuk mengacak urutan array menggunakan algoritma Fisher-Yates
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Fungsi untuk membuat set kartu baru berdasarkan difficulty
const createCards = (difficulty) => {
  const pairCount = DIFFICULTY_CONFIG[difficulty].pairs;
  const selectedIcons = ICONS.slice(0, pairCount);
  
  const pairs = selectedIcons.flatMap((item, index) => [
    { id: index * 2, icon: item.icon, color: item.color, pairId: index },
    { id: index * 2 + 1, icon: item.icon, color: item.color, pairId: index },
  ]);

  return shuffleArray(pairs);
};

// Fungsi format waktu (seconds -> mm:ss)
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export default function Home() {
  // State difficulty
  const [difficulty, setDifficulty] = useState("easy");
  
  // State 'cards' menyimpan array kartu yang sudah diacak
  const [cards, setCards] = useState([]);

  // State 'flippedCards' menyimpan id kartu yang sedang terbuka (maks 2)
  const [flippedCards, setFlippedCards] = useState([]);

  // State 'matchedCards' menyimpan id kartu yang sudah berhasil dicocokkan
  const [matchedCards, setMatchedCards] = useState([]);

  // State 'moves' menyimpan jumlah percobaan yang dilakukan pemain
  const [moves, setMoves] = useState(0);
  
  // State timer dan game status
  const [timer, setTimer] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  // useEffect untuk inisialisasi/Reset kartu saat difficulty berubah
  useEffect(() => {
    resetGame();
  }, [difficulty]);

  // useEffect untuk timer - berjalan hanya jika game sudah mulai dan belum menang
  useEffect(() => {
    let interval;
    if (isGameStarted && !isGameWon) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameStarted, isGameWon]);

  // useEffect untuk mengecek kecocokan setiap kali 2 kartu terbuka
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;

      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      // Tambah jumlah percobaan setiap kali 2 kartu dibuka
      setMoves((prev) => prev + 1);

      // Jika kedua kartu memiliki pairId yang sama, berarti cocok
      if (firstCard?.pairId === secondCard?.pairId) {
        // Tambahkan kedua kartu ke matchedCards
        setMatchedCards((prev) => [...prev, firstId, secondId]);
        setFlippedCards([]);
      } else {
        // Jika tidak cocok, tutup kembali setelah 800ms
        const timer = setTimeout(() => {
          setFlippedCards([]);
        }, 800);

        return () => clearTimeout(timer);
      }
    }
  }, [flippedCards, cards]);

  // useEffect untuk cek kondisi menang
  useEffect(() => {
    const totalPairs = DIFFICULTY_CONFIG[difficulty].pairs;
    if (matchedCards.length === totalPairs * 2 && moves > 0) {
      setIsGameWon(true);
    }
  }, [matchedCards, moves, difficulty]);

  // Fungsi untuk membalik kartu ketika diklik
  const handleCardFlip = (id) => {
    // Start timer on first flip
    if (!isGameStarted) setIsGameStarted(true);
    
    // Hanya izinkan membalik jika kurang dari 2 kartu terbuka
    if (flippedCards.length < 2 && !flippedCards.includes(id) && !isGameWon) {
      setFlippedCards((prev) => [...prev, id]);
    }
  };

  // Fungsi untuk mereset permainan ke kondisi awal
  const resetGame = () => {
    setCards(createCards(difficulty));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimer(0);
    setIsGameStarted(false);
    setIsGameWon(false);
  };

  return (
    // Container utama dengan background gradient
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
      
      {/* 🎴 Header dengan Icon dan Judul - Sesuai Screenshot */}
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold flex items-center justify-center gap-4 mb-2">
          <span className="bg-yellow-400 rounded-lg p-2 text-5xl text-slate-900">
            <GiCardJoker />
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 drop-shadow-2xl">
            Memory Card
          </span>
        </h1>
      </div>

      {/* 🔥 DIFFICULTY SELECTOR dengan Emoji */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setDifficulty("easy")}
          className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
            difficulty === "easy"
              ? "bg-yellow-400 text-slate-900 shadow-lg shadow-yellow-400/50"
              : "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 backdrop-blur-sm"
          }`}
        >
          😊 Easy (4)
        </button>
        
        <button
          onClick={() => setDifficulty("medium")}
          className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
            difficulty === "medium"
              ? "bg-yellow-400 text-slate-900 shadow-lg shadow-yellow-400/50"
              : "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 backdrop-blur-sm"
          }`}
        >
          😐 Medium (6)
        </button>
        
        <button
          onClick={() => setDifficulty("hard")}
          className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
            difficulty === "hard"
              ? "bg-yellow-400 text-slate-900 shadow-lg shadow-yellow-400/50"
              : "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 backdrop-blur-sm"
          }`}
        >
          💀 Hard (8)
        </button>
      </div>

      {/* Komponen ScoreBoard - Timer diletakkan disamping moves */}
      <ScoreBoard
        moves={moves}
        timer={formatTime(timer)}
        matchedCount={matchedCards.length / 2}
        totalPairs={DIFFICULTY_CONFIG[difficulty].pairs}
        onReset={resetGame}
        isWon={isGameWon}
      />

      {/* 🎉 Pesan Selamat Menang - Muncul di ATAS game board (sesuai screenshot) */}
      {isGameWon && (
        <div className="mb-6 animate-win-entrance">
          <div className="bg-amber-900/40 backdrop-blur-md border border-amber-700/50 text-amber-100 px-6 py-4 rounded-2xl shadow-xl max-w-md mx-auto">
            <p className="text-lg font-bold text-center">
              🎉 Selamat! Selesai dalam waktu {formatTime(timer)} dengan {moves} percobaan!
            </p>
          </div>
        </div>
      )}

      {/* Komponen GameBoard untuk menampilkan grid kartu */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl mt-4">
        <GameBoard
          cards={cards}
          flippedCards={flippedCards}
          matchedCards={matchedCards}
          onFlip={handleCardFlip}
        />
      </div>
    </div>
  );
}