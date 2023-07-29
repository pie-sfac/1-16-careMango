export interface CounselingScheduleItemData {
  id: number;
  startAt: string;
  endAt: string;
  memo: string;
  isCanceled: true;
  canceledAt: string;
  counselor: {
    id: 0;
    name: string;
  };
  client: {
    memberId: 0;
    name: string;
    phone: string;
  };
  counselingRecord: {
    id: 0;
    content: string;
    createdBy: {
      id: 0;
      name: string;
    };
    updatedBy: {
      id: 0;
      name: string;
    };
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  createdBy: {
    id: 0;
    name: string;
  };
  updatedAt: string;
  updatedBy: {
    id: 0;
    name: string;
  };
}
