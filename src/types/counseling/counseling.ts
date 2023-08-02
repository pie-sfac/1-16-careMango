export interface IdName {
  id: number;
  name: string;
}

export interface CounselingRecord {
  id: number;
  content: string;
  createdBy: IdName;
  updatedBy: IdName;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  memberId: number;
  name: string;
  phone: string;
}

export interface CounselingData {
  id: number;
  startAt: string;
  endAt: string;
  memo: string;
  isCanceled: boolean;
  canceledAt: string;
  counselor: IdName;
  client: Client;
  counselingRecord: CounselingRecord;
  createdAt: string;
  createdBy: IdName;
  updatedAt: string;
  updatedBy: IdName;
}
