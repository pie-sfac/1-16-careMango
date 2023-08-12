import { atom } from 'recoil';
import { StateType } from '@/types/counseling/counseling'

export const schedulesState = atom<StateType[]>({
  key: 'schedules',
  default: [],
});
