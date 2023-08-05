import { atom } from 'recoil';

interface UserData {
  id: number;
  type: 'ADMIN' | 'STAFF';
  loginId: string;
  name: string;
  phone: string;
  active: boolean;
}

export const userState = atom<UserData | null>({
  key: 'userState',
  default: null,
});
