import React, { useState, useMemo } from 'react';
import { animeList } from './data';

function Header({ experience, searchQuery, setSearchQuery, onSelectAnime }) {
  const [searchActive, setSearchActive] = useState(false);
  
  const searchResults = useMemo(() => {
    if (!searchQuery?.trim()) return [];
    return animeList.filter(anime => 
      anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anime.originalTitle?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen?.();
    }
  };

  const nextLevelXP = 500;
  const progress = Math.min((experience / nextLevelXP) * 100, 100);

  return (
    <header className="max-w-7xl mx-auto py-3 md:py-6 px-4 md:px-6 relative text-white z-50">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        
        {/* ВЕРХНЯЯ ПАНЕЛЬ: Логотип + Статы + Кнопки */}
        <div className="flex justify-between items-center w-full md:w-auto gap-2">
          {/* ЛОГОТИП */}
          <div className="text-lg md:text-xl font-medium tracking-[0.2em] italic hover:text-mint-accent transition-all cursor-pointer group whitespace-nowrap uppercase flex-shrink-0">
            BLADE<span className="text-mint-accent">MINT</span>
          </div>

          {/* КОМПЛЕКСНАЯ ПАНЕЛЬ СТАТОВ ДЛЯ МОБИЛКИ */}
          <div className="flex items-center gap-1.5 md:hidden ml-auto">
            {/* XP Панель */}
            <div className="relative bg-white/[0.02] border border-white/5 px-2 py-1 rounded-md overflow-hidden">
              <div 
                className="absolute bottom-0 left-0 h-[1.5px] bg-mint-accent shadow-[0_0_8px_#00ffaa] transition-all duration-1000 opacity-60" 
                style={{ width: `${progress}%` }}
              ></div>
              <div className="flex items-center gap-2 relative z-10">
                <div className="flex flex-col items-end leading-none">
                  <span className="text-[6px] uppercase text-knight-steel mb-0.5">Rank</span>
                  <span className="text-[8px] uppercase font-bold text-white whitespace-nowrap">
                    {experience < 50 ? "Стр." : experience < 300 ? "Рыцарь" : "Мастер"}
                  </span>
                </div>
                <div className="w-[1px] h-4 bg-white/10"></div>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[6px] uppercase text-knight-steel mb-0.5">Exp</span>
                  <span className="text-[8px] font-mono text-mint-accent">{experience}</span>
                </div>
              </div>
            </div>

            {/* Фуллскрин */}
            <button onClick={toggleFullScreen} className="w-8 h-8 rounded-md bg-white/[0.03] border border-white/10 flex items-center justify-center text-knight-steel">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
            </button>

            {/* Профиль */}
            <button className="w-8 h-8 rounded-md bg-white/[0.03] border border-white/10 flex items-center justify-center text-knight-steel">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </button>
          </div>
        </div>

        {/* СТРОКА ПОИСКА (второй ряд на мобилке) */}
        <div className={`relative w-full md:max-w-md transition-all duration-500 ${searchActive ? 'md:flex-grow' : 'md:w-64'}`}>
          <div className="relative flex items-center">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ПОИСК ТАЙТЛА..."
              onFocus={() => setSearchActive(true)}
              onBlur={() => setTimeout(() => setSearchActive(false), 200)}
              className="w-full bg-white/[0.03] border border-white/5 rounded-md py-2.5 md:py-2 pl-10 pr-4 text-[10px] tracking-[0.2em] text-white placeholder:text-knight-steel/50 focus:outline-none focus:border-mint-accent/30 focus:bg-white/[0.05] transition-all"
            />
            <div className="absolute left-3 text-knight-steel">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>

          {/* ВЫПАДАЮЩИЕ РЕЗУЛЬТАТЫ */}
          {searchActive && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#0d0d0d]/95 backdrop-blur-xl border border-white/10 rounded-md overflow-hidden shadow-2xl z-[60]">
              {searchResults.map((anime) => (
                <div 
                  key={anime.id}
                  onClick={() => { onSelectAnime(anime); setSearchQuery(''); }}
                  className="flex items-center gap-3 p-2 hover:bg-mint-accent/10 cursor-pointer border-b border-white/5 last:border-none group"
                >
                  <img src={anime.img} alt="" className="w-8 h-11 object-cover rounded-sm border border-white/10" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-wider group-hover:text-mint-accent">{anime.title}</span>
                    <span className="text-[7px] text-knight-steel uppercase opacity-60 truncate max-w-[200px]">{anime.originalTitle}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* НАВИГАЦИЯ И СТАТЫ (ДЛЯ ДЕСКТОПА) */}
        <div className="hidden md:flex items-center gap-5">
          <nav className="flex gap-6 text-[9px] uppercase tracking-[0.2em] font-medium text-knight-steel mr-2">
            <a href="#" className="hover:text-white transition-colors">Библиотека</a>
            <a href="#" className="hover:text-white transition-colors">Рыцари</a>
          </nav>

          <button onClick={toggleFullScreen} className="w-9 h-9 rounded-md bg-white/[0.03] border border-white/10 flex items-center justify-center text-knight-steel hover:text-mint-accent transition-all ml-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
          </button>

          <div className="flex items-center gap-3">
            <div className="relative group bg-white/[0.02] border border-white/5 px-4 py-1.5 rounded-md overflow-hidden">
              <div className="absolute bottom-0 left-0 h-[2px] bg-mint-accent shadow-[0_0_8px_#00ffaa] transition-all duration-1000 opacity-60" style={{ width: `${progress}%` }}></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="flex flex-col items-end leading-none">
                  <span className="text-[7px] uppercase text-knight-steel mb-1">Rank</span>
                  <span className="text-[10px] uppercase font-bold text-white">{experience < 50 ? "Странник" : experience < 300 ? "Рыцарь" : "Мастер"}</span>
                </div>
                <div className="w-[1px] h-5 bg-white/10"></div>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[7px] uppercase text-knight-steel mb-1">Exp</span>
                  <span className="text-[10px] font-mono text-mint-accent">{experience}</span>
                </div>
              </div>
            </div>
            <button className="w-9 h-9 rounded-md bg-white/[0.03] border border-white/10 flex items-center justify-center text-knight-steel hover:text-mint-accent transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </button>
          </div>
        </div>

      </div>
      <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </header>
  );
}

export default Header;