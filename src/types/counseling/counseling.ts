export interface StateType {
  userId: number;
  memberId: number;
  clientName: string;
  clientPhone: string;
  memo: string;
  startAt: string;
  endAt: string;
}

export interface UpdateStateType {
  userId: number;
  memberId: number;
  clientName: string;
  clientPhone: string;
  memo: string;
  startAt: string;
  endAt: string;
  counselingRecordContent: string;
}
