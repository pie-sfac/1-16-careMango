import { atom } from 'recoil';
import { StateType } from '@/types/counseling/counseling'

export const schedulesState = atom<StateType[]>({
  key: 'schedules',
  default: [],
});

export const cancelScheduleIdState = atom<string | null>({
  key: 'cancelScheduleIdState',
  default: null,
});

export const timeListState = atom<string[][]>({
  key: 'timeListState',
  default: [],
});