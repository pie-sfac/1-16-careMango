export interface ScheduleItemData {
  id: number;
  tutor: { id: number; name: string };
  lessonId: number;
  maxGroupMember: number;
  startAt: string;
  endAt: string;
  memo: string;
  issuedTicket: {
    id: number;
    lessonType: 'SINGLE' | 'DUET' | 'TRIPLE' | 'GROUP';
    title: string;
    startAt: string;
    endAt: string;
    remainingCount: number;
    defaultCount: number;
    serviceCount: number;
    availableReservationCount: number;
    defaultTerm: number;
    defaultTermUnit: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
    isSuspended: boolean;
    suspendedAt: string;
    isCanceled: boolean;
    canceledAt: string;
    createdAt: string;
    updatedAt: string;
  };
  attendanceHistories: [
    {
      id: number;
      member: {
        id: number;
        name: string;
        phone: string;
      };
      status: 'WAIT' | 'PRESENT' | 'ABSENT';
    },
  ];
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
