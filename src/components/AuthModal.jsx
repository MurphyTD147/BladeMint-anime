import React from 'react';

// Словарь ошибок переехал сюда
const getFriendlyErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email': return 'НЕКОРРЕКТНЫЙ АДРЕС ПОЧТЫ';
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password': return 'АККАУНТ НЕ НАЙДЕН ИЛИ ПАРОЛЬ НЕВЕРЕН';
    case 'auth/email-already-in-use': return 'ЭТОТ РЫЦАРЬ УЖЕ В СТРОЮ (ПОЧТА ЗАНЯТА)';
    default: return 'ОШИБКА ДОСТУПА (ПРОВЕРЬТЕ ДАННЫЕ)';
  }
};

const AuthModal = ({ 
  isOpen, 
  onClose, 
  isRegistering, 
  setIsRegistering, 
  email, 
  setEmail, 
  password, 
  setPassword, 
  handleAuthAction, 
  authError, 
  setAuthError,
  isVerificationSent,
  setIsVerificationSent
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={() => { onClose(); setIsVerificationSent(false); }}
      />
      
      <div className="relative bg-[#0f0f0f] border border-white/10 p-8 rounded-xl w-full max-w-sm shadow-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-medium uppercase tracking-[0.3em] text-white">
            {isRegistering ? 'Создать аккаунт' : 'Вход в систему'}
          </h2>
          <div className="h-[1px] w-12 bg-mint-accent mx-auto mt-4 shadow-[0_0_8px_#00ffaa]"></div>
        </div>

        <div className="space-y-4">
          {isVerificationSent ? (
            <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
              <div className="w-12 h-12 bg-mint-accent/10 border border-mint-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ffaa" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </div>
              <p className="text-[10px] text-white uppercase tracking-[0.2em] mb-2 font-bold">Письмо отправлено!</p>
              <p className="text-[8px] text-knight-steel uppercase tracking-widest leading-relaxed">
                Проверь почту <span className="text-white font-bold">{email}</span> и подтверди аккаунт.
              </p>
              <button 
                onClick={() => { onClose(); setIsVerificationSent(false); }}
                className="mt-6 w-full border border-white/10 hover:border-mint-accent/30 text-white py-2 rounded text-[8px] uppercase tracking-widest transition-all"
              >
                Понятно
              </button>
            </div>
          ) : (
            <form 
              onSubmit={(e) => { e.preventDefault(); handleAuthAction(); }} 
              className="space-y-4"
            >
              {authError && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-[8px] p-2.5 rounded text-center tracking-[0.2em] animate-pulse uppercase">
                  {getFriendlyErrorMessage(authError)}
                </div>
              )}

              <div className="space-y-1">
                <label htmlFor="auth-email" className="text-[8px] uppercase tracking-widest text-knight-steel ml-1">Электронная почта</label>
                <input 
                  id="auth-email"
                  name="email"
                  type="email" 
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-md py-3 px-4 text-[10px] outline-none focus:border-mint-accent/30 transition-all text-white"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="auth-password" className="text-[8px] uppercase tracking-widest text-knight-steel ml-1">
                  Пароль <span className="opacity-50">(6-20 символов)</span>
                </label>
                <input 
                  id="auth-password"
                  name="password"
                  type="password" 
                  autoComplete={isRegistering ? "new-password" : "current-password"}
                  required
                  value={password}
                  maxLength={20}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-md py-3 px-4 text-[10px] outline-none focus:border-mint-accent/30 transition-all text-white"
                />
              </div>

              <button type="submit" className="w-full bg-mint-accent text-black font-bold py-3.5 rounded-md text-[9px] tracking-[0.3em] uppercase hover:bg-[#00e699] transition-all">
                {isRegistering ? 'Зарегистрироваться' : 'Авторизоваться'}
              </button>

              <p 
                className="text-center text-[8px] text-knight-steel uppercase tracking-widest cursor-pointer hover:text-white mt-6" 
                onClick={() => { setIsRegistering(!isRegistering); setAuthError(''); }}
              >
                {isRegistering ? 'Уже есть профиль? Войти' : 'Нет аккаунта? Стать рыцарем'}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;