export const getRank = (exp) => {
  if (exp < 50) return "Новичок";
  if (exp < 150) return "Странник";
  if (exp < 300) return "Оруженосец";
  if (exp < 600) return "Рыцарь";
  if (exp < 1000) return "Всадник";
  if (exp < 2000) return "Паладин";
  return "Мастер";
};

export const calculateProgress = (exp) => Math.min((exp / 2000) * 100, 100);