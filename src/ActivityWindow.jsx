import React, { useState, useEffect } from 'react';

const ACTIONS = ["исследует архивы", "смотрит серию", "завершил эпизод", "повысил уровень", "вступил в орден"];
const USERS = ["Semyon", "Murphy", "Blade_Runner", "MintMaster", "Neo_Tokyo", "Ghost_In_Shell"];
const ANIME = ["JoJo: Phantom Blood", "Monster", "Berserk", "Cyberpunk: Edgerunners"];

function ActivityWindow() {
  const [logs, setLogs] = useState([
    { id: 1, text: "BladeMint System Online", time: "START" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const user = USERS[Math.floor(Math.random() * USERS.length)];
      const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
      const subject = ANIME[Math.floor(Math.random() * ANIME.length)];
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const newLog = {
        id: Date.now(),
        text: `${user} ${action} ${subject}`,
        time: time
      };

      setLogs(prev => [newLog, ...prev].slice(0, 20)); // Храним последние 20 записей
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-24 border border-white/5 bg-white/[0.01] rounded-lg overflow-hidden max-w-4xl mx-auto mb-10 shadow-2xl">
      {/* Шапка окна */}
      <div className="px-5 py-3 bg-white/[0.03] border-b border-white/5 flex justify-between items-center text-[9px] uppercase tracking-[0.2em] font-medium text-knight-steel">
        <div className="flex items-center gap-3">
          <div className="w-1 h-1 bg-mint-accent rounded-full animate-pulse shadow-[0_0_5px_#00ffaa]"></div>
          Журнал активности ордена
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/20">Nodes: 12</span>
          <span className="text-mint-accent">Live</span>
        </div>
      </div>

      {/* Список логов */}
      <div className="h-40 overflow-y-auto p-4 space-y-2 logs-scrollbar">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-4 items-center animate-log">
            <span className="text-[8px] font-mono text-white/20 whitespace-nowrap">{log.time}</span>
            <div className="h-[1px] w-2 bg-white/5"></div>
            <p className="text-[10px] text-white/50 tracking-wider uppercase">
              {log.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ActivityWindow;