import React, { useState, useMemo } from 'react';
import Header from './Header';
import Player from './Player';
import AnimeCard from './AnimeCard';
import ActivityWindow from './ActivityWindow';
import Filter from './Filter';
import { animeList } from './data';
import Footer from './Footer';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentAnime, setCurrentAnime] = useState(animeList[0]);
  const [experience, setExperience] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState('Все');

  // Состояние для избранного (загружаем из localStorage при старте)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('bladeMint_favs');
    return saved ? JSON.parse(saved) : [];
  });

  // Функция переключения избранного
  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const isFav = prev.includes(id);
      const next = isFav ? prev.filter(favId => favId !== id) : [...prev, id];
      localStorage.setItem('bladeMint_favs', JSON.stringify(next));
      return next;
    });
  };

  // Проверка, является ли текущее аниме избранным
  const isCurrentFavorite = favorites.includes(currentAnime?.id);

  // 1. Все части этой же серии (кроме текущей)
  const relatedSeries = useMemo(() => {
    return animeList.filter(a => a.series === currentAnime.series && a.id !== currentAnime.id);
  }, [currentAnime]);

  // 2. Похожие по жанрам (из других серий)
  const recommendedAnime = useMemo(() => {
    return animeList.filter(a => 
      a.series !== currentAnime.series && 
      a.info.some(genre => currentAnime.info.includes(genre))
    );
  }, [currentAnime]);

  // 3. Вынеси функцию клика, чтобы не дублировать
  const handleSelect = (anime) => {
    setCurrentAnime(anime);
    setExperience(prev => prev + 10);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const genres = useMemo(() => {
    const allGenres = animeList.flatMap(anime => 
      Array.isArray(anime.info) ? anime.info : []
    );
    return ['Все', 'Избранное', ...new Set(allGenres)]; // Добавили пункт "Избранное"
  }, []);

  const filteredAnime = useMemo(() => {
  let list = animeList;
  
  if (selectedGenre === 'Избранное') {
    list = list.filter(anime => favorites.includes(anime.id));
  } else if (selectedGenre !== 'Все') {
    list = list.filter(anime => Array.isArray(anime.info) && anime.info.includes(selectedGenre));
  }

  if (searchQuery.trim()) {
    list = list.filter(anime => 
      anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anime.originalTitle?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  return list;
}, [selectedGenre, favorites, searchQuery]);

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

      {/* ОБОЛОЧКА КОНТЕНТА */}
      <div className="relative z-10">
        <Header 
        experience={experience} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        onSelectAnime={handleSelect} // Чтобы при клике в поиске аниме открывалось
      />

        <main className="max-w-7xl mx-auto mt-10 px-6 pb-20">
          
          {/* Блок заголовка */}
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
                {currentAnime && Array.isArray(currentAnime.info) 
                  ? currentAnime.info.join(' / ') 
                  : "Нет жанров"}
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

          {/* Блок "Все части" */}
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
                    onSelect={handleSelect} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* Блок "Похожие" */}
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
                    onSelect={handleSelect} 
                  />
                ))}
              </div>
            </div>
          )}

          <Filter 
            genres={genres} 
            selectedGenre={selectedGenre} 
            onSelectGenre={setSelectedGenre} 
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {filteredAnime.length > 0 ? (
              filteredAnime.map((anime) => (
                <AnimeCard 
                  key={anime.id} 
                  anime={anime} 
                  isFavorite={favorites.includes(anime.id)} 
                  onToggleFavorite={() => toggleFavorite(anime.id)} 
                  onSelect={handleSelect} 
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-knight-steel uppercase tracking-widest text-xs">
                Сектор пуст. Попробуйте другой фильтр.
              </div>
            )}
          </div>

          <ActivityWindow />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;