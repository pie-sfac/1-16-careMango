import { atom } from 'recoil';

export const schedulesState = atom<StateType[]>({
  key: 'schedules',
  default: [],
});
