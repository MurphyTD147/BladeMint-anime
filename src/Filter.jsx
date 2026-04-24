// components/Filter.jsx
import React from 'react';

function Filter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="mt-12 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-[1px] w-4 bg-mint-accent"></div>
        <span className="text-[9px] uppercase tracking-[0.3em] text-knight-steel">Сортировка</span>
      </div>
      
      {/* Контейнер со скрытым скроллом */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar -mx-2 px-2 md:mx-0 md:flex-wrap">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onSelectGenre(genre)}
            className={`px-4 py-2 rounded-md text-[9px] uppercase tracking-widest transition-all duration-300 border whitespace-nowrap
              ${selectedGenre === genre
                ? 'border-mint-accent text-mint-accent bg-mint-accent/5 shadow-[0_0_10px_rgba(0,255,170,0.1)]'
                : 'border-white/5 text-knight-steel hover:border-white/20 hover:text-white bg-white/[0.01]'
              }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filter;