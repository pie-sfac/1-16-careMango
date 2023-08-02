// 날짜 생성함수
export const getDay = (dateString?: string, type?: string) => {
  const date = dateString ? new Date(dateString) : new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const weekday = date.toLocaleString('ko-KR', { weekday: 'long' });

  if (type === 'weekday') return `${year}.${month}.${day} (${weekday})`;
  return `${year}-${month}-${day}`;
};

// 날짜 생성함수
export const getDay2 = (date: Date, type?: string) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const weekday = date.toLocaleString('ko-KR', { weekday: 'long' });

  if (type === 'weekday') return `${year}.${month}.${day} (${weekday})`;
  return `${year}-${month}-${day}`;
};

// 시간 생성함수
export const getTime = (dateString: string) => {
  const date = new Date(dateString);
  let hour: number | string = date.getHours();
  hour = hour < 10 ? `0${hour}` : hour;
  let minute: number | string = date.getMinutes();
  minute = minute < 10 ? `0${minute}` : minute;
  return `${hour}:${minute}`;
};

// 날짜 단위에 따라 계산하는 함수
export const calculateDate = (date: string, unit: string, amount: number) => {
  const calculatedDate = new Date(date);
  const startDate = new Date(date);

  switch (unit) {
    case 'DAY':
      calculatedDate.setDate(startDate.getDate() + amount);
      break;
    case 'WEEK':
      calculatedDate.setDate(startDate.getDate() + amount * 7);
      break;
    case 'MONTH':
      calculatedDate.setMonth(startDate.getMonth() + amount);
      break;
    case 'YEAR':
      calculatedDate.setFullYear(startDate.getFullYear() + amount);
      break;
    default:
      break;
  }

  return calculatedDate;
};
