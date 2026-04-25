import React, { useState, useMemo } from 'react';
import { animeList } from './data';
import { useAuth } from './hooks/useAuth';
import AuthModal from './components/AuthModal';
import { UserStats } from './components/UserStats';

function Header({ searchQuery, setSearchQuery, onSelectAnime }) {
  const [searchActive, setSearchActive] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // Для выпадающего меню
  const { user, isAuthModalOpen, setAuthModalOpen, login, register, logout, addExperience } = useAuth();

  // Состояния для форм
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const searchResults = useMemo(() => {
    if (!searchQuery?.trim()) return [];
    return animeList.filter(anime => 
      anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anime.originalTitle?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery]);

  const handleAuthAction = async () => {
    setAuthError(''); 
    if (!email.trim() || !password.trim()) return setAuthError('auth/missing-fields');
    try {
      if (isRegistering) {
        await register(email, password);
        setIsVerificationSent(true);
      } else {
        await login(email, password);
        setAuthModalOpen(false);
      }
      setEmail(''); setPassword('');
    } catch (error) {
      setAuthError(error.code);
    }
  };

  return (
    <header className="max-w-7xl mx-auto py-3 md:py-6 px-4 md:px-6 relative text-white z-50">
      <AuthModal 
        isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)}
        {...{isRegistering, setIsRegistering, email, setEmail, password, setPassword, handleAuthAction, authError, setAuthError, isVerificationSent, setIsVerificationSent}}
      />

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        {/* Logo & Mobile UI */}
        <div className="flex justify-between items-center w-full md:w-auto gap-2">
          <div className="text-lg md:text-xl font-medium tracking-[0.2em] italic hover:text-mint-accent transition-all cursor-pointer uppercase">
            BLADE<span className="text-mint-accent">MINT</span>
          </div>

          <div className="flex items-center gap-1.5 md:hidden ml-auto">
            <UserStats exp={user?.experience || 0} mobile />
            <ProfileButton user={user} onClick={() => user ? setProfileMenuOpen(!profileMenuOpen) : setAuthModalOpen(true)} />
          </div>
        </div>

        {/* Search */}
        <div className={`relative w-full md:max-w-md transition-all ${searchActive ? 'md:flex-grow' : 'md:w-64'}`}>
          <input 
            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchActive(true)} onBlur={() => setTimeout(() => setSearchActive(false), 200)}
            placeholder="ПОИСК ТАЙТЛА..."
            className="w-full bg-white/[0.03] border border-white/5 rounded-md py-2 px-4 text-[10px] tracking-[0.2em] outline-none focus:border-mint-accent/30"
          />
          {searchActive && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#0d0d0d] border border-white/10 rounded-md overflow-hidden z-[60]">
              {searchResults.map((anime) => (
                <div key={anime.id} onClick={() => { onSelectAnime(anime); }} className="flex items-center gap-3 p-2 hover:bg-mint-accent/10 cursor-pointer border-b border-white/5">
                  <img src={anime.img} alt="" className="w-8 h-11 object-cover rounded-sm" />
                  <span className="text-[9px] font-bold uppercase">{anime.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop UI */}
        <div className="hidden md:flex items-center gap-5">
          <nav className="flex gap-6 text-[9px] uppercase tracking-[0.2em] font-medium text-knight-steel">
            <a href="#" className="hover:text-white transition-colors">Библиотека</a>
            <a href="#" className="hover:text-white transition-colors">Рыцари</a>
          </nav>
          <div className="flex items-center gap-3 relative">
            <UserStats exp={user?.experience || 0} />
            <ProfileButton user={user} onClick={() => user ? setProfileMenuOpen(!profileMenuOpen) : setAuthModalOpen(true)} />
            
            {/* Dropdown Menu */}
            {profileMenuOpen && user && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-[#0d0d0d] border border-white/10 rounded-md p-2 shadow-2xl z-[100] animate-in fade-in slide-in-from-top-2">
                <div className="px-2 py-1.5 border-b border-white/5 mb-1">
                  <p className="text-[8px] text-knight-steel uppercase">Аккаунт</p>
                  <p className="text-[10px] truncate font-bold text-mint-accent">{user.email}</p>
                </div>
                <button onClick={() => { logout(); setProfileMenuOpen(false); }} className="w-full text-left px-2 py-1.5 text-[9px] uppercase hover:bg-red-500/10 text-red-400 rounded transition-colors">
                  Выйти
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// Мини-компонент кнопки профиля для чистоты
const ProfileButton = ({ user, onClick }) => (
  <button onClick={onClick} className="w-9 h-9 rounded-md border border-white/10 flex items-center justify-center hover:border-mint-accent transition-all relative group">
    {user ? (
      <>
        <span className="text-xs font-bold text-mint-accent group-hover:scale-110 transition-transform">{user.email[0].toUpperCase()}</span>
        <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-[#0d0d0d] ${user.emailVerified ? 'bg-mint-accent' : 'bg-yellow-500 animate-pulse'}`}></div>
      </>
    ) : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    )}
  </button>
);

export default Header;