import { CounselingSchedule, PrivateSchedule } from '@/types/scheduleApi';

export interface Schedule {
  id: string;
  calendarId: string;
  title: string;
  category: string;
  start: string;
  end: string;
  attendance?: string;
  duration?: string;
  memberName?: string;
  remainingTimes?: string;
  isCanceled?: boolean;
}

export const convertToDisplayData = (apiResponse: {
  counselingSchedules: CounselingSchedule[];
  privateSchedules: PrivateSchedule[];
}): Schedule[] => {
  const displayData: Schedule[] = [];

  // Convert counseling schedules
  apiResponse.counselingSchedules.forEach((counseling) => {
    displayData.push({
      id: counseling.id.toString(),
      calendarId: '1',
      title: `상담: ${counseling.client.name}`,
      category: 'time',
      start: counseling.startAt,
      end: counseling.endAt,
      attendance: '상담',
      duration: '',
      memberName: counseling.client.name,
      remainingTimes: '',
      isCanceled: counseling.isCanceled,
    });
  });

  // Convert private schedules
  apiResponse.privateSchedules.forEach((privateSchedule) => {
    const attendance = privateSchedule.isCanceled ? '결석' : '출석';

    displayData.push({
      id: privateSchedule.id.toString(),
      calendarId: '2',
      title: `${attendance}: ${privateSchedule.tutor.name}`,
      category: 'time',
      start: privateSchedule.startAt,
      end: privateSchedule.endAt,
      attendance,
      duration: '',
      memberName: privateSchedule.tutor.name,
      remainingTimes: '',
      isCanceled: privateSchedule.isCanceled,
    });
  });

  return displayData;
};
