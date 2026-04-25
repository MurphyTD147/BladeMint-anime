import { getRank, calculateProgress } from '../utils/ranks';

export const UserStats = ({ exp, mobile }) => {
  const progress = calculateProgress(exp);
  const rank = getRank(exp);

  if (mobile) {
    return (
      <div className="relative bg-white/[0.02] border border-white/5 px-2 py-1 rounded-md overflow-hidden">
        <div className="absolute bottom-0 left-0 h-[1.5px] bg-mint-accent transition-all duration-500" style={{ width: `${progress}%` }}></div>
        <span className="text-[8px] uppercase font-bold relative z-10">{rank} | {exp} XP</span>
      </div>
    );
  }

  return (
    <div className="relative bg-white/[0.02] border border-white/5 px-4 py-1.5 rounded-md overflow-hidden">
      <div className="absolute bottom-0 left-0 h-[2px] bg-mint-accent transition-all duration-500" style={{ width: `${progress}%` }}></div>
      <div className="flex items-center gap-3 relative z-10">
        <span className="text-[10px] font-bold">{rank}</span>
        <div className="w-[1px] h-4 bg-white/10"></div>
        <span className="text-[10px] font-mono text-mint-accent">{exp} XP</span>
      </div>
    </div>
  );
};