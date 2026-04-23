import React from 'react';

// Мы передаем в компонент объект 'anime' и функцию 'onSelect' (это наш клик)
function AnimeCard({ anime, onSelect }) {
  return (
    <div 
      onClick={() => onSelect(anime)}
      className="group cursor-pointer"
    >
      {/* Постер */}
      <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-mint-gray border border-white/5 group-hover:border-mint-accent/40 transition-all duration-500">
        <img 
          src={anime.img} 
          alt={anime.title} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
        />
        
        <div className="absolute top-4 left-4 bg-mint-accent text-black text-[10px] font-black px-2 py-1 uppercase tracking-tighter shadow-xl">
          {anime.series} серий
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        <div className="absolute inset-0 bg-mint-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Текст под постером */}
      <div className="mt-4">
        <h3 className="text-lg font-bold group-hover:text-mint-accent transition-colors duration-300 italic">
          {anime.title}
        </h3>
        <p className="text-[10px] text-knight-steel uppercase tracking-widest mt-1 text-opacity-60">
          {anime.info}
        </p>
      </div>
    </div>
  );
}

export default AnimeCard;