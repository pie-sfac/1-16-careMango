// 날짜 생성함수
export const getDay = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const weekday = date.toLocaleString('ko-KR', { weekday: 'long' });

  return `${year}.${month}.${day} (${weekday})`;
};

// 시간 생성함수
export const getTime = (dateString: string) => {
  const date = new Date(dateString);
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${hour}:${minute}`;
};
