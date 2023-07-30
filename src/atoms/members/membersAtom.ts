import { atom } from 'recoil';
import { MembersItemData } from '../../types/members';

export const membersListState = atom<MembersItemData[]>({
  key: 'membersListState',
  default: [],
});

export const searchQueryState = atom<string>({
  key: 'searchQueryState',
  default: '',
});
