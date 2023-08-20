import { CounselingSchedule, PrivateSchedule } from '@/types/scheduleApi';

export interface Schedule {
  [x: string]: any;
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
  console.log(apiResponse);

  const displayData: Schedule[] = [];

  // Convert counseling schedules
  apiResponse.counselingSchedules.forEach((counseling) => {
    if (!counseling.isCanceled) {
      // 취소되지 않은 상담만 추가
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
    }
    // console.log(displayData);
  });

  // Convert private schedules
  apiResponse.privateSchedules.forEach((privateSchedule) => {
    if (!privateSchedule.isCanceled) {
      // 취소되지 않은 개인 스케줄만 추가
      let attendance = '결석';

      if (privateSchedule.attendanceHistories && privateSchedule.attendanceHistories.length > 0) {
        const status = privateSchedule.attendanceHistories[0].status;

        switch (status) {
          case 'PRESENT':
            attendance = '출석';
            break;
          case 'WAIT':
            attendance = '예약';
            break;
          case 'ABSENT':
          default:
            attendance = '결석';
            break;
        }
      }

      displayData.push({
        id: privateSchedule.id.toString(),
        calendarId: '2',
        title: `${attendance}: ${privateSchedule.attendanceHistories[0].member.name}`,
        category: 'time',
        start: privateSchedule.startAt,
        end: privateSchedule.endAt,
        attendance,
        duration: '',
        memberName: privateSchedule.tutor.name,
        remainingTimes: '',
        isCanceled: privateSchedule.isCanceled,
      });
    }
    // console.log(displayData);
  });

  return displayData;
};
