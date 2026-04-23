import React, { useState, useEffect } from 'react';

function Player({ anime }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setCurrentStep(0);
  }, [anime]);

  // Защита на случай, если episodes еще не определен или пуст
  if (!anime || !anime.episodes || anime.episodes.length === 0) {
    return (
      <div className="p-10 border border-dashed border-white/10 text-center text-knight-steel uppercase text-[10px] tracking-widest">
        Данные серий загружаются или отсутствуют
      </div>
    );
  }

  return (
    <section className="mb-12">
      {/* Плеер */}
      <div className="bg-mint-gray rounded-sm overflow-hidden border border-white/10 shadow-2xl">
        <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex justify-between items-center">
          <span className="text-[9px] uppercase font-bold text-knight-steel tracking-widest">
            BladeMint Engine
          </span>
          <span className="text-[10px] font-black text-mint-accent">
            СЕРИЯ {currentStep + 1} ИЗ {anime.episodes.length}
          </span>
        </div>
        
        <div className="aspect-video w-full bg-black">
          <iframe 
            key={`${anime.id}-${currentStep}`}
            src={anime.episodes[currentStep]} 
            referrerPolicy="no-referrer"
            width="100%" 
            height="100%" 
            frameBorder="0" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
      
      {/* Сетка выбора серий */}
      <div className="mt-6">
        <h3 className="text-[10px] uppercase font-black text-white/30 mb-3 tracking-tighter">Выберите серию:</h3>
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
          {anime.episodes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`py-2 text-[11px] font-bold transition-all border ${
                currentStep === index 
                ? 'bg-mint-accent border-mint-accent text-mint-gray shadow-[0_0_15px_rgba(0,255,170,0.3)]' 
                : 'border-white/10 text-white/60 hover:border-white/40 hover:text-white'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Кнопки Назад/Вперед (оставил для удобства) */}
      <div className="mt-6 flex justify-between items-center border-t border-white/5 pt-4">
        <button 
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="text-[9px] uppercase font-bold text-knight-steel hover:text-white disabled:opacity-0 transition-all"
        >
          ← Предыдущая
        </button>
        <button 
          onClick={() => setCurrentStep(prev => Math.min(anime.episodes.length - 1, prev + 1))}
          disabled={currentStep === anime.episodes.length - 1}
          className="text-[9px] uppercase font-bold text-knight-steel hover:text-white disabled:opacity-0 transition-all"
        >
          Следующая →
        </button>
      </div>
    </section>
  );
}

export default Player;