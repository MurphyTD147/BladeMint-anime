import React from 'react';

function Footer() {
  return (
    <footer className="mt-10 border-t border-white/5 bg-black/20 py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Лево: Лого и Версия */}
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium tracking-[0.3em] italic uppercase whitespace-nowrap">
            BLADE<span className="text-mint-accent">MINT</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>
          <span className="text-[8px] font-mono text-knight-steel uppercase tracking-tighter opacity-40">
            OS_v1.0.4 // REL_2026
          </span>
        </div>

        {/* Центр: Ссылки (в одну строку) */}
        <nav className="flex items-center gap-6 text-[9px] uppercase tracking-[0.2em] font-medium text-knight-steel">
          <a href="#" className="hover:text-mint-accent transition-colors">Главная</a>
          <a href="#" className="hover:text-mint-accent transition-colors">Discord</a>
          <a href="#" className="hover:text-mint-accent transition-colors">Правообладателям</a>
        </nav>

        {/* Право: Статус и Хостинг */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-mint-accent rounded-full shadow-[0_0_5px_#00ffaa]"></div>
            <span className="text-[9px] text-white/40 uppercase tracking-widest font-mono">
              Server: <span className="text-white/80">Online</span>
            </span>
          </div>
          <div className="hidden lg:block text-[8px] text-knight-steel/30 font-mono uppercase tracking-tighter">
            Powered_by_Vercel
          </div>
        </div>

      </div>
      
      {/* Маленький копирайт в самом низу */}
      <div className="max-w-7xl mx-auto mt-4 text-center md:text-left">
        <p className="text-[7px] text-white/10 uppercase tracking-[0.4em]">
          © 2026 blademint project. All systems operational.
        </p>
      </div>
    </footer>
  );
}

export default Footer;