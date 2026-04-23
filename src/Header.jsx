import React from 'react';

function Header({ experience }) {
  // Расчет прогресса до следующего уровня (для примера возьмем порог 500 XP)
  const nextLevelXP = 500;
  const progress = Math.min((experience / nextLevelXP) * 100, 100);

  return (
    <header className="max-w-7xl mx-auto flex justify-between items-center py-6 md:py-8 px-6 relative">
      {/* Левая часть: Логотип */}
      <div className="flex items-center gap-6">
        <div className="text-xl md:text-2xl font-medium tracking-[0.2em] italic hover:text-mint-accent transition-all cursor-pointer group">
          BLADE<span className="text-mint-accent group-hover:text-white transition-colors">MINT</span>
          <div className="h-[1px] w-0 group-hover:w-full bg-mint-accent transition-all duration-500"></div>
        </div>
        
        {/* Статус Системы (только для десктопа) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 border-l border-white/10">
          <div className="w-1 h-1 rounded-full bg-mint-accent shadow-[0_0_5px_#00ffaa]"></div>
          <span className="text-[8px] uppercase tracking-[0.3em] text-white/20 font-medium">
            System_Active
          </span>
        </div>
      </div>
      
      {/* Правая часть: Навигация и Статы */}
      <nav className="flex items-center gap-6 md:gap-10">
        {/* Поиск (Минимализм) */}
        <button className="hidden sm:block text-knight-steel hover:text-mint-accent transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>

        {/* Ссылки */}
        <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.3em] font-medium text-knight-steel">
          <a href="#" className="hover:text-white transition-colors relative group">
            Библиотека
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-mint-accent group-hover:w-full transition-all"></span>
          </a>
          <a href="#" className="hover:text-white transition-colors relative group text-mint-accent/60">
            Рыцари
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all"></span>
          </a>
        </div>
        
        {/* Кастомный Индикатор XP / Звания */}
        <div className="relative group cursor-help">
          <div className="flex flex-col items-end gap-1">
             <div className="flex items-center gap-3 bg-[#0f0f0f] border border-white/5 px-4 py-2 rounded-md transition-all group-hover:border-mint-accent/30">
                <div className="flex flex-col items-end">
                  <span className="text-[8px] uppercase tracking-tighter text-knight-steel font-medium">Звание</span>
                  <span className="text-[10px] uppercase tracking-[0.1em] font-bold text-white">
                    {experience < 50 ? "Странник" : 
                     experience < 150 ? "Оруженосец" : 
                     experience < 300 ? "Рыцарь" : "Мастер"}
                  </span>
                </div>
                
                {/* Круговой индикатор или просто разделитель */}
                <div className="w-[1px] h-6 bg-white/10"></div>
                
                <div className="flex flex-col items-start">
                  <span className="text-[8px] uppercase tracking-tighter text-knight-steel font-medium">Опыт</span>
                  <span className="text-[10px] font-mono text-mint-accent">{experience} XP</span>
                </div>
             </div>
             
             {/* Полоска прогресса под инфо-панелью */}
             <div className="w-full h-[2px] bg-white/5 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-mint-accent shadow-[0_0_8px_#00ffaa] transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                ></div>
             </div>
          </div>
        </div>
      </nav>
      
      {/* Тонкая декоративная линия на всю ширину шапки внизу */}
      <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </header>
  );
}

export default Header;