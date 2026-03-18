import React from 'react';
import { FaQuestion } from 'react-icons/fa';

// Komponen untuk menampilkan satu kartu memori
// Props:
// - card: objek { id, icon, color, pairId }
// - isFlipped: boolean - kartu sedang terbuka?
// - isMatched: boolean - kartu sudah cocok?
// - onFlip: function - handler ketika kartu diklik
function Card({ card, isFlipped, isMatched, onFlip }) {
    
    // Handler klik kartu - hanya bisa flip jika belum terbuka & belum matched
    const handleClick = () => {
        if (!isFlipped && !isMatched) {
            onFlip(card.id);
        }
    };

    const isOpen = isFlipped || isMatched;
    const IconComponent = card.icon;

    // 🎨 Enhanced className dengan Tailwind CSS
    const cardClass = `
        w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
        flex items-center justify-center 
        text-3xl sm:text-4xl md:text-5xl
        rounded-2xl 
        cursor-pointer 
        select-none 
        transition-all 
        duration-500 
        ease-in-out
        transform
        relative
        overflow-hidden
        ${isOpen 
            ? 'bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl scale-100 rotate-0' 
            : 'bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 shadow-lg hover:scale-110 hover:shadow-2xl hover:rotate-3 hover:from-purple-500 hover:via-pink-400 hover:to-cyan-400'
        }
        ${isMatched 
            ? 'ring-4 ring-green-400 ring-opacity-75 animate-pulse shadow-green-400/50' 
            : 'hover:ring-2 hover:ring-white/50'
        }
    `;

    return (
        <div 
            onClick={handleClick} 
            className={cardClass}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            aria-label={isOpen ? `Kartu: ${card.icon.name}` : 'Kartu tertutup'}
        >
            {/* ✨ Efek glow background untuk kartu tertutup */}
            {!isOpen && (
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            )}

            {/* 🎴 Konten kartu - Icon atau Question Mark */}
            <div className={`
                flex items-center justify-center 
                transition-all duration-500 ease-in-out
                ${isOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-90 scale-90'}
            `}>
                {isOpen ? (
                    // Tampilkan icon ketika kartu terbuka/matched
                    <span className={`
                        drop-shadow-lg 
                        ${isMatched ? 'animate-bounce-once text-green-500' : 'animate-pop-in'}
                    `}>
                        <IconComponent 
                            style={{ 
                                color: card.color,
                                filter: isMatched ? 'drop-shadow(0 0 8px rgba(74, 222, 128, 0.8))' : 'none'
                            }} 
                            className="transition-transform duration-300 hover:scale-110"
                        />
                    </span>
                ) : (
                    // Tampilkan tanda tanya ketika kartu tertutup
                    <FaQuestion 
                        className="text-white/80 text-2xl sm:text-3xl drop-shadow-md group-hover:text-white transition-colors duration-300" 
                    />
                )}
            </div>

            {/* ✨ Shine effect animation untuk kartu matched */}
            {isMatched && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
            )}
        </div>
    );
}

export default Card;