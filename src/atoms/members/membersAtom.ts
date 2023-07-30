import { atom } from 'recoil';
import { MembersItemData, CreateMembersItemData } from '../../types/members';

export const membersListState = atom<MembersItemData[]>({
  key: 'membersListState',
  default: [],
});

export const searchQueryState = atom<string>({
  key: 'searchQueryState',
  default: '',
});

export const memberState = atom<CreateMembersItemData>({
  key: 'memberState',
  default: {
    name: '',
    birthDate: '',
    phone: '',
    sex: '',
    job: '',
    visitRoute: '',
  },
});
