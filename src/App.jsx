import React from 'react';
// Импортируем компоненты
import Header from './Header';
import Player from './Player';
import AnimeCard from './AnimeCard';

// Импортируем данные
import { animeList } from './data';

function App() {
  // Инициализируем состояние первым элементом из списка
  const [currentAnime, setCurrentAnime] = React.useState(animeList[0]);
  const [experience, setExperience] = React.useState(0);

  return (
    <div className="min-h-screen bg-mint-black text-white font-sans selection:bg-mint-accent selection:text-black">
      {/* Шапка сайта */}
      <Header experience={experience} />

      <main className="max-w-7xl mx-auto mt-10 px-6 pb-20">
        {/* Заголовок секции */}
        <div className="mb-12 border-l-2 border-mint-accent pl-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight italic text-white">Новые Клинки</h2>
          <p className="text-knight-steel text-sm tracking-wide mt-2">Последние поступления в орден BladeMint</p>
        </div>

        {/* Компонент Плеера */}
        <Player anime={currentAnime} />

        {/* Сетка карточек аниме */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {animeList.map((anime) => (
            <AnimeCard 
              key={anime.id} 
              anime={anime} 
              onSelect={(selected) => {
                setCurrentAnime(selected);
                setExperience(prev => prev + 10);
                // Плавный скролл к плееру при выборе аниме
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;