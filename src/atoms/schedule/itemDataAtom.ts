import { atom } from 'recoil';
import { ScheduleItemData } from '@/types/schedule/schedule';

export const itemDataState = atom<ScheduleItemData | null>({
  key: 'itemDataState',
  default: null,
});
