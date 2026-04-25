import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 1. Добавляем импорт Auth

const firebaseConfig = {
  apiKey: "AIzaSyDtjymGYSv2UeWoRHYMdSjV76xNmc45z-4",
  authDomain: "blademint-anime-db.firebaseapp.com",
  projectId: "blademint-anime-db",
  storageBucket: "blademint-anime-db.firebasestorage.app",
  messagingSenderId: "685121883123",
  appId: "1:685121883123:web:91db49df73084eef90e086"
};

// Инициализируем Firebase
const app = initializeApp(firebaseConfig);

// Создаем и экспортируем экземпляры
export const db = getFirestore(app);
export const auth = getAuth(app); // 2. Экспортируем Auth