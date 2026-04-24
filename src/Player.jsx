import React, { useState, useEffect } from 'react';

function Player({ anime }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setCurrentStep(0);
  }, [anime]);

  if (!anime || !anime.episodes || anime.episodes.length === 0) {
    return (
      <div className="p-10 border border-dashed border-white/5 text-center text-knight-steel uppercase text-[9px] tracking-[0.2em]">
        Waiting for data transmission...
      </div>
    );
  }

  const progress = ((currentStep + 1) / anime.episodes.length) * 100;

  return (
    <section className="mb-12 max-w-5xl mx-auto">
      {/* Контейнер плеера */}
      <div className="relative group bg-[#0d0d0d] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
        {/* Верхняя панель */}
        <div className="px-5 py-3 bg-white/[0.02] border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-1 h-1 rounded-full bg-mint-accent animate-pulse"></div>
            <span className="text-[9px] uppercase font-medium text-knight-steel tracking-[0.2em]">
              BladeMint System
            </span>
          </div>
          <span className="text-[10px] font-normal text-white/40 tracking-wider">
            EPISODE <span className="text-mint-accent">{currentStep + 1}</span> / {anime.episodes.length}
          </span>
        </div>
        
        {/* Видео контейнер с защитой */}
        <div className="relative aspect-video w-full bg-black overflow-hidden">
          <iframe 
            key={`${anime.id}-${currentStep}`}
            src={anime.episodes[currentStep]} 
            referrerPolicy="no-referrer"
            width="100%" 
            height="100%" 
            frameBorder="0" 
            allowFullScreen
            className="opacity-90 group-hover:opacity-100 transition-opacity duration-700"
          ></iframe>

          {/* ЗАЩИТНЫЙ СЛОЙ (Ghost Shield) 
            pointer-events-none пропускает обычные клики (пауза/громкость),
            но блокирует "глубокое" распознавание объекта браузером на мобилках.
          */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ 
              WebkitTouchCallout: 'none', // Отключает вызов меню ссылки на iOS
              userSelect: 'none' 
            }}
            onContextMenu={(e) => e.stopPropagation()} 
          ></div>
        </div>

        {/* Индикатор прогресса */}
        <div className="h-[2px] w-full bg-white/5">
          <div 
            className="h-full bg-mint-accent transition-all duration-500 ease-out shadow-[0_0_10px_#00ffaa]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {/* Сетка выбора серий */}
      <div className="mt-8">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-[9px] uppercase font-medium text-white/20 tracking-[0.15em] whitespace-nowrap">
            Select Episode
          </h3>
          <div className="h-[1px] w-full bg-white/5"></div>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2">
          {anime.episodes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`h-10 text-[11px] font-normal transition-all duration-300 rounded-md border ${
                currentStep === index 
                ? 'bg-mint-accent/10 border-mint-accent/50 text-mint-accent shadow-[0_0_20px_rgba(0,255,170,0.1)]' 
                : 'border-white/[0.05] text-white/30 hover:border-white/20 hover:text-white/80'
              }`}
            >
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Навигация */}
      <div className="mt-8 flex justify-center gap-12">
        <button 
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="group flex flex-col items-center gap-1 disabled:opacity-0 transition-all"
        >
          <span className="text-[18px] text-knight-steel group-hover:text-mint-accent transition-colors">←</span>
          <span className="text-[8px] uppercase tracking-widest text-knight-steel font-medium">Prev</span>
        </button>

        <button 
          onClick={() => setCurrentStep(prev => Math.min(anime.episodes.length - 1, prev + 1))}
          disabled={currentStep === anime.episodes.length - 1}
          className="group flex flex-col items-center gap-1 disabled:opacity-0 transition-all"
        >
          <span className="text-[18px] text-knight-steel group-hover:text-mint-accent transition-colors">→</span>
          <span className="text-[8px] uppercase tracking-widest text-knight-steel font-medium">Next</span>
        </button>
      </div>
    </section>
  );
}

export default Player;