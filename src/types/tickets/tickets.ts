export interface BookableLessons {
  id: number;
  type: 'SINGLE' | 'DUET' | 'TRIPLE' | 'GROUP';
  title: string;
  duration: number;
  maxGroupMember: number;
}
export interface TicketsData extends Tickets {
  isActive: boolean;
  maxServiceCount: number;
  issuedTicketCount: number;
  bookableLessons: BookableLessons[];
}

export interface Tickets {
  id: number;
  title: string;
  lessonType: 'SINGLE' | 'DUET' | 'TRIPLE' | 'GROUP';
  defaultCount: number;
  defaultTerm: number;
  defaultTermUnit: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
}

export interface IssuedTicketsData extends Tickets {
  startAt: string;
  endAt: string;
  remainingCount: number;
  serviceCount: number;
  availableReservationCount: number;
  isSuspended: boolean;
  suspendedAt: string;
  isCanceled: boolean;
  canceledAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketType {
  lessonType: string;
  title: string;
  defaultTerm: number;
  defaultTermUnit: string;
  duration: number;
  defaultCount: number;
  maxServiceCount?: number;
}

export interface IssuedTicketData extends IssuedTicketsData {
  privateTutor: {
    id: number;
    type: 'ADMIN' | 'STAFF';
    loginId: string;
    name: string;
    phone: string;
    isActive: boolean;
  };
}

export interface IssuedTicketListData {
  id: number;
  owners: [
    {
      id: number;
      name: string;
      phone: string;
    },
  ];
  privateTutor: {
    id: number;
    name: string;
  };
  remainingTimes: 0;
  startAt: string;
  endAt: string;
}
