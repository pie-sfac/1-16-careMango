import { atom } from 'recoil';

const counselingRecordsState = atom({
  key: 'counselingRecordsState',
  default: [],
});

export default counselingRecordsState;
