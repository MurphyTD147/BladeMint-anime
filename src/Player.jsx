import React from 'react';

function Player({ anime }) {
  if (!anime) return null;

  return (
    <section className="mb-12 md:mb-20"> {/* Уменьшил отступ снизу на мобилках */}
      <div className="relative group">
        {/* Эффект свечения — на мобилках лучше сделать тише, чтобы не "жрало" ресурсы */}
        <div className="absolute -inset-1 bg-mint-accent/20 blur-2xl opacity-10 md:opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
        
        {/* Корпус плеера */}
        <div className="relative bg-mint-gray rounded-sm overflow-hidden border border-white/10 shadow-2xl">
          <div className="flex justify-between items-center px-3 py-2 md:px-4 bg-white/5 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              <span className="text-[8px] md:text-[9px] uppercase tracking-widest font-bold text-knight-steel truncate max-w-[150px] md:max-w-none">
                Источник: Kodik (BladeMint Engine)
              </span>
            </div>
            <span className="text-[8px] md:text-[9px] text-white/40 font-mono italic">1080p</span>
          </div>
          
          <div className="aspect-video w-full bg-black"> {/* Добавил фон, пока грузится iframe */}
            <iframe 
              src={anime.videoUrl} 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allowFullScreen
              className="grayscale-[0.2] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
              title={anime.title}
            ></iframe>
          </div>
        </div>
        
        {/* Кнопки и название под плеером: на мобилках в две строки, на ПК в одну */}
        <div className="mt-4 flex flex-col md:flex-row gap-3 md:justify-between md:items-center text-[10px] uppercase tracking-widest font-bold">
          <div className="flex gap-6 justify-center md:justify-start border-b border-white/5 pb-3 md:border-none md:pb-0">
            <span className="text-mint-accent cursor-pointer hover:underline active:scale-95 transition-transform">Назад</span>
            <span className="text-white cursor-pointer hover:underline active:scale-95 transition-transform">Вперед</span>
          </div>
          <div className="text-knight-steel text-center md:text-right truncate">
            {anime.title}
          </div>
        </div>

        {/* Описание: уменьшил паддинги на мобилках */}
        <div className="mt-6 md:mt-8 p-4 md:p-6 bg-white/5 border-l-2 md:border-l-4 border-mint-accent rounded-r-lg">
          <h4 className="text-[9px] md:text-[10px] uppercase tracking-widest font-black text-mint-accent mb-2">
            Инфо о тайтле:
          </h4>
          <p className="text-xs md:text-sm text-knight-steel leading-relaxed">
            {anime.desc}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Player;