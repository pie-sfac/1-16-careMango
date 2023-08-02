export interface User {
  id: number;
  name: string;
}

export interface Counselor {
  id: number;
  name: string;
}

export interface Client {
  memberId: number;
  name: string;
  phone: string;
}

export interface CounselingSchedule {
  id: number;
  startAt: string;
  endAt: string;
  memo: string;
  isCanceled: boolean;
  canceledAt: string;
  counselor: Counselor;
  client: Client;
  createdAt: string;
  updatedAt: string;
}

export interface Tutor {
  id: number;
  name: string;
}

export interface IssuedTicket {
  id: number;
  lessonType: string;
  title: string;
  startAt: string;
  endAt: string;
  remainingCount: number;
  defaultCount: number;
  serviceCount: number;
  availableReservationCount: number;
  defaultTerm: number;
  defaultTermUnit: string;
  isSuspended: boolean;
  suspendedAt: string;
  isCanceled: boolean;
  canceledAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  id: number;
  name: string;
  phone: string;
}

export interface AttendanceHistory {
  id: number;
  member: Member;
  status: string;
}

export interface PrivateSchedule {
  id: number;
  tutor: Tutor;
  startAt: string;
  endAt: string;
  memo: string;
  isCanceled: boolean;
  canceledAt: string;
  issuedTicket: IssuedTicket;
  attendanceHistories: AttendanceHistory[];
  createdAt: string;
  updatedAt: string;
}

export interface SchedulApiData {
  users: User[];
  counselingSchedules: CounselingSchedule[];
  privateSchedules: PrivateSchedule[];
}
