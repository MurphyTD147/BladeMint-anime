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
    <header className="max-w-7xl mx-auto py-3 md:py-6 px-3 md:px-6 relative text-white z-50">
      <div className="flex justify-between items-center gap-2 md:gap-4">
        
        {/* 1. ЛОГОТИП — на мобилках скрываем, когда поиск активен */}
        <div className={`${searchActive ? 'hidden sm:flex' : 'flex'} items-center flex-shrink-0`}>
          <div className="text-sm md:text-xl font-medium tracking-[0.2em] italic hover:text-mint-accent transition-all cursor-pointer group uppercase">
            BLADE<span className="text-mint-accent">MINT</span>
          </div>
        </div>

        {/* 2. ПОИСК */}
        <div className={`relative transition-all duration-500 ${searchActive ? 'flex-grow' : 'w-10 sm:w-64'}`}>
          <div className="relative flex items-center">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchActive ? "ПОИСК..." : ""}
              onFocus={() => setSearchActive(true)}
              onBlur={() => setTimeout(() => setSearchActive(false), 200)}
              className={`w-full bg-white/[0.03] border border-white/5 rounded-md py-2 pl-9 pr-4 text-[10px] tracking-[0.1em] text-white focus:outline-none focus:border-mint-accent/30 transition-all ${
                searchActive ? 'opacity-100' : 'opacity-0 sm:opacity-100 cursor-pointer'
              }`}
            />
            <div className="absolute left-2.5 text-knight-steel pointer-events-none">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          {/* ВЫПАДАЮЩЕЕ ОКНО */}
          {searchActive && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#0d0d0d]/98 backdrop-blur-xl border border-white/10 rounded-md overflow-hidden shadow-2xl z-[60]">
              {searchResults.map((anime) => (
                <div 
                  key={anime.id}
                  onClick={() => { onSelectAnime(anime); setSearchQuery(''); }}
                  className="flex items-center gap-3 p-2 hover:bg-mint-accent/10 cursor-pointer border-b border-white/5 last:border-none"
                >
                  <img src={anime.img} alt="" className="w-7 h-10 object-cover rounded-sm" />
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-[9px] font-bold uppercase truncate">{anime.title}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. БЛОК УПРАВЛЕНИЯ И СТАТОВ */}
        <div className={`flex items-center gap-1.5 md:gap-4 ${searchActive ? 'hidden xs:flex' : 'flex'}`}>
          
          {/* ФУЛЛСКРИН */}
          <button 
            onClick={toggleFullScreen}
            className="w-8 h-8 rounded-md bg-white/[0.03] border border-white/10 flex items-center justify-center text-knight-steel hover:text-mint-accent transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
          </button>

          {/* XP ПАНЕЛЬ */}
          <div className="bg-white/[0.02] border border-white/5 h-8 px-2 md:px-3 rounded-md flex items-center gap-2 relative overflow-hidden">
            <div 
              className="absolute bottom-0 left-0 h-[1px] bg-mint-accent shadow-[0_0_5px_#00ffaa] transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
            
            {/* На мобилках оставляем только число Exp */}
            <div className="hidden md:flex flex-col items-end leading-none">
              <span className="text-[6px] uppercase text-knight-steel">Rank</span>
              <span className="text-[8px] font-bold text-white uppercase truncate max-w-[50px]">
                {experience < 50 ? "Стр." : experience < 300 ? "Рыцарь" : "Маст."}
              </span>
            </div>
            <div className="hidden md:block w-[1px] h-3 bg-white/10"></div>
            <span className="text-[9px] font-mono text-mint-accent">{experience}</span>
          </div>

          {/* ПРОФИЛЬ */}
          <button className="w-8 h-8 rounded-md bg-white/[0.03] border border-white/10 flex items-center justify-center text-knight-steel transition-all">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;