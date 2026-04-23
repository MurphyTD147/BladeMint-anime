import React from 'react';

function Header({ experience }) {
  return (
    <header className="max-w-7xl mx-auto flex justify-between items-center py-6 md:py-10 px-6">
      {/* Логотип: на мобилках чуть меньше текст (text-2xl) */}
      <div className="text-2xl md:text-3xl font-black tracking-tighter italic hover:scale-105 transition-transform cursor-pointer">
        BLADE<span className="text-mint-accent">MINT</span>
      </div>
      
      {/* Навигация и Статус */}
      <nav className="flex items-center gap-4 md:gap-10">
        {/* Ссылки: по-прежнему скрываем на мобилках, показываем от md (768px) */}
        <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.4em] font-bold text-knight-steel">
          <a href="#" className="hover:text-white transition-colors">Библиотека</a>
          <a href="#" className="hover:text-white transition-colors">Рыцари</a>
        </div>
        
        {/* Индикатор Звания: теперь виден всегда! */}
        <div className="flex items-center gap-2 md:gap-3 bg-white/5 border border-white/10 px-3 py-1 md:px-4 md:py-1.5 rounded-full">
          <div className="relative">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-mint-accent animate-ping absolute opacity-75"></div>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-mint-accent relative"></div>
          </div>
          <span className="text-[8px] md:text-[9px] uppercase tracking-widest font-black text-white">
            <span className="hidden sm:inline">Звание:</span> 
            <span className="text-mint-accent ml-1">
              {experience < 50 ? "Странник" : 
               experience < 150 ? "Оруженосец" : 
               experience < 300 ? "Рыцарь Мяты" : "Мастер Клинка"} 
              <span className="ml-1 text-white/60">({experience} XP)</span>
            </span>
          </span>
        </div>
      </nav>
    </header>
  );
}

export default Header;