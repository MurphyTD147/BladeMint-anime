import React, { useState, useMemo } from 'react';
import Header from './Header';
import Player from './Player';
import AnimeCard from './AnimeCard';
import ActivityWindow from './ActivityWindow';
import Filter from './Filter';
import { animeList } from './data';
import Footer from './Footer';

function App() {
  const [currentAnime, setCurrentAnime] = useState(animeList[0]);
  const [experience, setExperience] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState('Все');

  const genres = useMemo(() => {
    const allGenres = animeList.flatMap(anime => 
      Array.isArray(anime.info) ? anime.info : []
    );
    return ['Все', ...new Set(allGenres)];
  }, []);

  const filteredAnime = useMemo(() => {
    if (selectedGenre === 'Все') return animeList;
    return animeList.filter(anime => 
      Array.isArray(anime.info) && anime.info.includes(selectedGenre)
    );
  }, [selectedGenre]);

  return (
    <div className="app-container min-h-screen text-white font-sans selection:bg-mint-accent selection:text-black bg-[#0d0d0d]">
      <Header experience={experience} />

      <main className="max-w-7xl mx-auto mt-10 px-6 pb-20">
        
        {/* Блок заголовка с поддержкой оригинального названия */}
        <div className="mb-10 border-l-2 border-mint-accent pl-6 transition-all duration-500">
          <span className="text-knight-steel text-[10px] uppercase tracking-[0.3em] opacity-50 mb-2 block">
            Сейчас смотрите
          </span>
          
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight italic uppercase text-white leading-tight">
            {currentAnime ? currentAnime.title : "Initializing..."}
          </h2>

          {/* Вторая строка названия (английское или японское) */}
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
        </div>

        <Player anime={currentAnime} />

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
                onSelect={(selected) => {
                  setCurrentAnime(selected);
                  setExperience(prev => prev + 10);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
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
  );
}

export default App;