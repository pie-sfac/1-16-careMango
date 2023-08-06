import { SchedulApiData, CounselingSchedule, PrivateSchedule } from '../types/scheduleApi';
// scheduleUtils.ts

export type ScheduleDisplayData = {
  id: number;
  title: string;
  start: string;
  end: string;
  type: 'Counseling' | 'Private';
  details: CounselingSchedule | PrivateSchedule;
};

export const convertToDisplayData = (data: SchedulApiData): ScheduleDisplayData[] => {
  const counselingData: ScheduleDisplayData[] = data.counselingSchedules.map((schedule) => ({
    id: schedule.id,
    title: `${schedule.client.name} - ${schedule.memo}`,
    start: schedule.startAt,
    end: schedule.endAt,
    type: 'Counseling',
    details: schedule,
  }));

  const privateData: ScheduleDisplayData[] = data.privateSchedules.map((schedule) => ({
    id: schedule.id,
    title: `${schedule.tutor.name} - ${schedule.memo}`,
    start: schedule.startAt,
    end: schedule.endAt,
    type: 'Private',
    details: schedule,
  }));

  return [...counselingData, ...privateData];
};
