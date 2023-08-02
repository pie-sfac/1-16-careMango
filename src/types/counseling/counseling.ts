export interface CounselingScheduleItemData {
  id: number;
  startAt: string;
  endAt: string;
  memo: string;
  isCanceled: true;
  canceledAt: string;
  counselor: {
    id: number;
    name: string;
  };
  client: {
    memberId: number;
    name: string;
    phone: string;
  };
  counselingRecord: {
    id: number;
    content: string;
    createdBy: {
      id: number;
      name: string;
    };
    updatedBy: {
      id: number;
      name: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  createdBy: {
    id: number;
    name: string;
  };
  updatedAt: string;
  updatedBy: {
    id: number;
    name: string;
  };
}
