import { atom } from 'recoil';

interface MemberIdData {
  memberId: number | string | undefined;
}

export const memberIdState = atom<MemberIdData>({
  key: 'memberIdState',
  default: undefined,
});
