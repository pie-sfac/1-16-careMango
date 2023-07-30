export interface BookableLessons {
  id: number;
  type: 'SINGLE' | 'DUET' | 'TRIPLE' | 'GROUP';
  title: string;
  duration: number;
  maxGroupMember: number;
}

export interface TicketsData {
  id: number;
  title: string;
  lessonType: 'SINGLE' | 'DUET' | 'TRIPLE' | 'GROUP';
  defaultCount: number;
  defaultTerm: number;
  defaultTermUnit: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
  isActive: boolean;
  maxServiceCount: number;
  issuedTicketCount: number;
  bookableLessons: BookableLessons[];
}
