import { useState, useEffect, useCallback } from 'react';
import { auth, db } from '../firebase'; 
import { 
  doc, 
  setDoc, 
  getDoc, 
  increment, 
  arrayUnion,
  onSnapshot // Добавили слушатель реального времени
} from "firebase/firestore";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  sendEmailVerification 
} from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let unsubscribeDoc = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      // Очищаем предыдущую подписку на документ, если она была
      if (unsubscribeDoc) unsubscribeDoc();

      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);

        // ПОДПИСКА НА БД В РЕАЛЬНОМ ВРЕМЕНИ
        unsubscribeDoc = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.email.split('@')[0],
              experience: Number(userData.experience) || 0,
              emailVerified: firebaseUser.emailVerified,
              viewedAnime: userData.viewedAnime || []
            });
          } else {
            // Если документа нет (новый юзер), ставим базу
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.email.split('@')[0],
              experience: 0,
              emailVerified: firebaseUser.emailVerified
            });
          }
          setLoading(false);
        }, (error) => {
          console.error("Snapshot error:", error);
          setLoading(false);
        });

      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeDoc) unsubscribeDoc();
    };
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const register = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = res.user;
    await sendEmailVerification(newUser);
    
    const initialData = {
      email: newUser.email,
      experience: 0,
      viewedAnime: [],
      createdAt: new Date()
    };

    await setDoc(doc(db, "users", newUser.uid), initialData);
  };

  const logout = () => signOut(auth);

  const addExperience = useCallback(async (amount = 1, animeId = null) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    
    try {
      // Если есть ID аниме, сначала проверяем viewed локально (из нашего живого стейта)
      // Это быстрее, чем лишний запрос getDoc
      if (animeId && user?.viewedAnime?.includes(animeId)) {
        console.log("Опыт уже начислен (локальная проверка)");
        return;
      }

      const updateData = {
        experience: increment(amount)
      };

      if (animeId) {
        updateData.viewedAnime = arrayUnion(animeId);
      }

      await setDoc(userRef, updateData, { merge: true });

      // ВАЖНО: Мы НЕ делаем здесь setUser вручную. 
      // onSnapshot сам увидит изменение в базе и обновит стейт!
      
      setToast({ msg: `+${amount} XP`, id: Math.random() });
      setTimeout(() => setToast(null), 3000);

    } catch (e) {
      console.error("XP Error:", e);
    }
  }, [user]); // Добавили user в зависимости для проверки viewedAnime

  return { 
    user, 
    isAuthModalOpen, 
    setAuthModalOpen, 
    login, 
    register, 
    logout, 
    addExperience, 
    loading,
    toast 
  };
}