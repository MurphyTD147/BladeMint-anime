import React from 'react';
import Header from './Header';
import Player from './Player';
import AnimeCard from './AnimeCard';
import ActivityWindow from './ActivityWindow';
import Filter from './Filter';
import Footer from './Footer';
import { useAnimeManager } from './hooks/useAnimeManager';
import { useAuth } from './hooks/useAuth'; // Проверь путь!

function App() {
  const { state, lists, actions } = useAnimeManager();
  const { addExperience, toast } = useAuth();

  // Распаковываем всё для удобства
  const { currentAnime, experience, searchQuery, selectedGenre, favorites, isCurrentFavorite } = state;
  const { filteredAnime, genres, relatedSeries, recommendedAnime } = lists;
  const { handleSelect, toggleFavorite, setSearchQuery, setSelectedGenre, handleRandomAnime } = actions;

  // Создаем обертку, которая и выбирает аниме, и дает опыт
  const handleSelectWithXP = (anime) => {
    handleSelect(anime); // Стандартное действие (открыть плеер)
    addExperience(1, anime.id); // Даем 1 XP, передавая ID аниме для проверки
  };

  console.log("Текущий опыт в App:", experience);
  
  return (
    <div className="app-container min-h-screen text-white font-sans selection:bg-mint-accent selection:text-black bg-[#0d0d0d] relative overflow-hidden">
      
      {/* ДИНАМИЧЕСКИЙ ФОН */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-all duration-[1500ms] ease-in-out"
        style={{
          background: `
            radial-gradient(circle at 50% 20%, ${currentAnime?.color || '#00ffaa'}25 0%, transparent 65%),
            radial-gradient(circle at 80% 80%, ${currentAnime?.color || '#00ffaa'}15 0%, transparent 50%)
          `,
          filter: 'blur(80px)'
        }}
      ></div>

      <div className="relative z-10">
        <Header 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          onSelectAnime={handleSelectWithXP} // <--- Тут
          experience={experience} // <-- УБЕДИСЬ, ЧТО ЭТО ТУТ ЕСТЬ
        />

        <main className="max-w-7xl mx-auto mt-10 px-6 pb-20">
          
          {/* Блок заголовка текущего тайтла */}
          <div className="mb-10 border-l-2 border-mint-accent pl-6 transition-all duration-500">
            <span className="text-knight-steel text-[10px] uppercase tracking-[0.3em] opacity-50 mb-2 block">
              Сейчас смотрите
            </span>
            
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight italic uppercase text-white leading-tight">
                {currentAnime ? currentAnime.title : "Initializing..."}
              </h2>
              <button 
                onClick={() => toggleFavorite(currentAnime.id)}
                className={`transition-all duration-300 hover:scale-110 ${isCurrentFavorite ? 'text-mint-accent' : 'text-white/20 hover:text-white/50'}`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill={isCurrentFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L19 9L12 16L5 9L12 2Z" />
                </svg>
              </button>
            </div>

            {currentAnime?.originalTitle && (
              <p className="text-knight-steel text-xs uppercase tracking-[0.15em] mt-2 opacity-60 font-light">
                {currentAnime.originalTitle}
              </p>
            )}

            <div className="flex items-center gap-3 mt-4">
              <div className="h-[1px] w-8 bg-mint-accent/50"></div>
              <p className="text-knight-steel text-[9px] uppercase tracking-[0.2em]">
                {currentAnime?.info?.join(' / ') || "Нет жанров"}
              </p>
            </div>

            {currentAnime?.desc && (
              <div className="mt-6 w-full max-w-4xl">
                <p className="text-knight-steel text-sm leading-relaxed opacity-80 font-light">
                  {currentAnime.desc}
                </p>
              </div>
            )}
          </div>

          <Player anime={currentAnime} />

          {/* Секция "Все части" */}
          {relatedSeries.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-4 bg-mint-accent"></div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-knight-steel">Все части серии</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                {relatedSeries.map(anime => (
                  <AnimeCard 
                    key={anime.id} 
                    anime={anime} 
                    isFavorite={favorites.includes(anime.id)} 
                    onToggleFavorite={() => toggleFavorite(anime.id)} 
                    onSelect={handleSelectWithXP} // <--- И тут 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Секция "Похожие" */}
          {recommendedAnime.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-4 bg-white/20"></div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-knight-steel">Похожие по жанрам</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                {recommendedAnime.slice(0, 6).map(anime => (
                  <AnimeCard 
                    key={anime.id} 
                    anime={anime} 
                    isFavorite={favorites.includes(anime.id)} 
                    onToggleFavorite={() => toggleFavorite(anime.id)} 
                    onSelect={handleSelectWithXP} // <--- И тут 
                  />
                ))}
              </div>
            </div>
          )}

          <Filter 
            genres={genres} 
            selectedGenre={selectedGenre} 
            onSelectGenre={setSelectedGenre} 
            onRandomAnime={handleRandomAnime}
          />

          {/* Основная сетка с проверкой на пустоту */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {filteredAnime.length > 0 ? (
              filteredAnime.map((anime) => (
                <AnimeCard 
                  key={anime.id} 
                  anime={anime} 
                  isFavorite={favorites.includes(anime.id)} 
                  onToggleFavorite={() => toggleFavorite(anime.id)} 
                  onSelect={handleSelectWithXP} // ТУТ ТЫ ЗАБЫЛ ЗАМЕНИТЬ
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-knight-steel uppercase tracking-widest text-[10px] opacity-40 border border-white/5 rounded-xl bg-white/[0.01]">
                Сектор пуст. Попробуйте другой фильтр.
              </div>
            )}
          </div>

          <ActivityWindow experience={experience} />
        </main>
        <Footer />
      </div>
      {/* Добавь это в самый низ перед последним закрывающим div */}
{toast && (
  <div className="fixed bottom-10 right-10 z-[1000] flex items-center gap-3 bg-mint-accent text-[#0d0d0d] px-6 py-3 rounded-md font-black uppercase tracking-tighter shadow-[0_0_30px_rgba(0,255,170,0.4)] animate-in fade-in slide-in-from-bottom-5">
    <div className="w-2 h-2 bg-[#0d0d0d] rounded-full animate-ping"></div>
    {toast.msg}
  </div>
)}
    </div>
  );
}

export default App;