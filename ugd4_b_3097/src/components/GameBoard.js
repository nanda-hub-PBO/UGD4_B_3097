import React from 'react';
import Card from './Card';

function GameBoard({ cards, flippedCards, matchedCards, onFlip }) {
    return (
        <div 
            className="
                grid grid-cols-4 gap-3 sm:gap-4 justify-items-center 
                p-4 sm:p-6 
                bg-white/5 backdrop-blur-md 
                border border-white/10 
                rounded-3xl 
                shadow-2xl shadow-purple-900/50
                hover:shadow-purple-800/60 
                transition-shadow duration-500
            "
        >
            {cards.map((card, index) => (
                <div
                    key={card.id}
                    className="animate-fade-in-up"
                    style={{ 
                        animationDelay: `${index * 50}ms`,
                        animationFillMode: 'both'
                    }}
                >
                    <Card
                        card={card}
                        isFlipped={flippedCards.includes(card.id)}
                        isMatched={matchedCards.includes(card.id)}
                        onFlip={onFlip}
                    />
                </div>
            ))}
        </div>
    );
}

export default GameBoard;