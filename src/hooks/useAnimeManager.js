import { useState, useMemo, useEffect } from 'react';
import { animeList } from '../data';

export function useAnimeManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentAnime, setCurrentAnime] = useState(animeList[0]);
  const [selectedGenre, setSelectedGenre] = useState('Все');

  // Избранное
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('bladeMint_favs');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const isFav = prev.includes(id);
      return isFav ? prev.filter(favId => favId !== id) : [...prev, id];
    });
  };

  useEffect(() => {
    localStorage.setItem('bladeMint_favs', JSON.stringify(favorites));
  }, [favorites]);

  const isCurrentFavorite = favorites.includes(currentAnime?.id);

  // Списки аниме (Related, Recommended)
  const relatedSeries = useMemo(() => {
    return animeList.filter(a => a.series === currentAnime.series && a.id !== currentAnime.id);
  }, [currentAnime]);

  const recommendedAnime = useMemo(() => {
    return animeList.filter(a => 
      a.series !== currentAnime.series && 
      (a.info || []).some(genre => (currentAnime.info || []).includes(genre))
    );
  }, [currentAnime]);

  // Жанры
  const genres = useMemo(() => {
    const allGenres = animeList.flatMap(anime => Array.isArray(anime.info) ? anime.info : []);
    return ['Все', 'Избранное', ...new Set(allGenres)];
  }, []);

  // Фильтрация
  const filteredAnime = useMemo(() => {
    let list = animeList;
    if (selectedGenre === 'Избранное') {
      list = list.filter(anime => favorites.includes(anime.id));
    } else if (selectedGenre !== 'Все') {
      list = list.filter(anime => Array.isArray(anime.info) && anime.info.includes(selectedGenre));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(anime => 
        anime.title.toLowerCase().includes(q) || anime.originalTitle?.toLowerCase().includes(q)
      );
    }
    return list;
    // ДОБАВИЛ animeList в зависимости ниже
  }, [selectedGenre, favorites, searchQuery, animeList]);

  // Обработчики
  const handleSelect = (anime) => {
    setCurrentAnime(anime);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRandomAnime = () => {
    const randomIndex = Math.floor(Math.random() * animeList.length);
    handleSelect(animeList[randomIndex]);
  };

  return {
    state: { searchQuery, currentAnime, selectedGenre, favorites, isCurrentFavorite },
    lists: { relatedSeries, recommendedAnime, genres, filteredAnime },
    actions: { setSearchQuery, setSelectedGenre, toggleFavorite, handleSelect, handleRandomAnime }
  };
}