import React from 'react';
import Header from './Header';
import Player from './Player';
import AnimeCard from './AnimeCard';
import ActivityWindow from './ActivityWindow';
import { animeList } from './data';
import Footer from './Footer';

function App() {
  // Инициализируем первым элементом из массива
  const [currentAnime, setCurrentAnime] = React.useState(animeList[0]);
  const [experience, setExperience] = React.useState(0);

  return (
    <div className="app-container min-h-screen text-white font-sans selection:bg-mint-accent selection:text-black">
      <Header experience={experience} />

      <main className="max-w-7xl mx-auto mt-10 px-6 pb-20">
        <div className="mb-12 border-l-2 border-mint-accent pl-6">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight italic uppercase">Новые Клинки</h2>
          <p className="text-knight-steel text-[10px] uppercase tracking-[0.2em] mt-2 opacity-60">
            Локальный терминал BladeMint | Offline Mode
          </p>
        </div>

        {/* Плеер */}
        <Player anime={currentAnime} />

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {animeList.map((anime) => (
            <AnimeCard 
              key={anime.id} 
              anime={anime} 
              onSelect={(selected) => {
                setCurrentAnime(selected);
                setExperience(prev => prev + 10);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ))}
        </div>

        <ActivityWindow />
      </main>
      <Footer />
    </div>
  );
}

export default App;