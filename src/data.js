// Переносим импорты картинок сюда
import jojo_part1Img from './assets/jojo_part1.jpg';
import jojo_part2Img from './assets/jojo_part2.jpg';
import jojo_part3Img from './assets/jojo_part3.jpg';

// Создаем массив и ЭКСПОРТИРУЕМ его
export const animeList = [
  { 
    id: 1, 
    title: "JoJo: Phantom Blood", 
    info: "Экшен / Приключения", 
    img: jojo_part1Img, 
    series: 9, 
    videoUrl: "https://adshost.cc/serial/315/34cc8167f08e79430c51121d55655383/720p", 
    desc: "История о чести, предательстве и невероятных сражениях! Начало эпической саги Джостаров." 
  },
  { 
    id: 2, 
    title: "JoJo: Battle Tendency", 
    info: "Экшен / Приключения", 
    img: jojo_part2Img, 
    series: 17, 
    videoUrl: "https://adshost.cc/serial/316/090400032906e0696f8c7e443831777d/720p", 
    desc: "Нью-Йорк, 1938 год. Джозеф Джостар вступает в битву против древних Людей из Колонн." 
  },
  { 
    id: 3, 
    title: "JoJo: Stardust Crusaders", 
    info: "Экшен / Приключения", 
    img: jojo_part3Img, 
    series: 48, 
    videoUrl: "https://adshost.cc/serial/1429/b66e3b88566f12e16d944a9590861614/720p", 
    desc: "Появление Стендов! Куджо Джотаро отправляется в Египет, чтобы покончить с Дио навсегда." 
  },
];