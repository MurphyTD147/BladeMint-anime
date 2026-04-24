import rawData from './animeData.json';

const KODIK_BASE = "https://kodikplayer.com/seria/";
const KODIK_POSTFIX = "/720p";

export const animeList = rawData.map(anime => ({
  ...anime,
  // Автоматически восстанавливаем полные ссылки
  episodes: anime.episodes.map(id => `${KODIK_BASE}${id}${KODIK_POSTFIX}`)
}));