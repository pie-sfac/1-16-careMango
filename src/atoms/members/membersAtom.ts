import { atom } from 'recoil';
import { MembersData } from '../../types/members/members';
// import { MembersItemData, CreateMembersItemData } from '../../types/members/members';

export const membersDataState = atom<MembersData[]>({
  key: 'membersListState',
  default: [],
});

export const searchQueryState = atom<string>({
  key: 'searchQueryState',
  default: '',
});
