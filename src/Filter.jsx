import React from 'react';

function Filter({ genres, selectedGenre, onSelectGenre, onRandomAnime }) { // <--- Добавь onRandomAnime
  return (
    <div className="mt-12 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-[1px] w-4 bg-mint-accent"></div>
        <span className="text-[9px] uppercase tracking-[0.3em] text-knight-steel">Сортировка</span>
      </div>
      
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar -mx-2 px-2 md:mx-0 md:flex-wrap">
        
        {/* КНОПКА РАНДОМА */}
        <button
          onClick={onRandomAnime}
          className="px-4 py-2 rounded-md text-[9px] uppercase tracking-widest transition-all duration-300 border border-mint-accent/20 text-white bg-mint-accent/10 hover:bg-mint-accent/20 hover:border-mint-accent/40 flex items-center gap-2 group shrink-0"
        >
          <svg 
            width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" 
            className="text-mint-accent group-hover:rotate-45 transition-transform duration-500"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" />
            <circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" />
            <circle cx="12" cy="12" r="1.2" fill="currentColor" />
          </svg>
          Мне повезёт
        </button>

        {/* ТВОЙ СТАРЫЙ СПИСОК ЖАНРОВ */}
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