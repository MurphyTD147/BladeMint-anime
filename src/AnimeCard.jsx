import React from 'react';

function AnimeCard({ anime, onSelect }) {
  // Автоматически считаем количество серий из массива episodes
  const episodeCount = anime.episodes ? anime.episodes.length : 0;

  return (
    <div 
      onClick={() => onSelect(anime)}
      className="group cursor-pointer"
    >
      {/* Контейнер постера */}
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#1a1a1a] border border-white/5 transition-all duration-500 group-hover:border-mint-accent/30 group-hover:shadow-[0_0_30px_rgba(0,255,170,0.05)]">
        
        {/* Изображение */}
        <img 
          src={anime.img} 
          alt={anime.title} 
          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
        />
        
        {/* Новая плашка с сериями (Glass Effect) */}
        <div className="absolute top-3 left-3 flex items-center">
          <div className="backdrop-blur-md bg-black/40 border border-white/10 px-2 py-1 rounded-md flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-mint-accent shadow-[0_0_5px_#00ffaa]"></div>
            <span className="text-[9px] md:text-[10px] font-medium text-white tracking-widest uppercase">
              {episodeCount > 0 ? `${episodeCount} EP` : "TBA"}
            </span>
          </div>
        </div>

        {/* Эффект при наведении: тонкая линия сканирования */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-mint-accent opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-1000 ease-in-out"></div>

        {/* Градиентный фильтр снизу */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
      </div>

      {/* Инфо под карточкой */}
      <div className="mt-4 px-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-sm md:text-base font-medium text-white/90 group-hover:text-mint-accent transition-colors duration-300 leading-tight">
            {anime.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[8px] md:text-[9px] text-knight-steel uppercase tracking-[0.2em] font-light">
            {anime.info}
          </span>
          <div className="h-[1px] flex-grow bg-white/5"></div>
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;