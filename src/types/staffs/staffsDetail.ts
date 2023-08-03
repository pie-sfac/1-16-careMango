import { Member } from '../members/members';

export interface PrescriptionReview {
  id: number;
  privateTutor: { id: number; name: string };
  member: { id: number; name: string; phone: string };
  rating: number;
  content: string;
  createdAt: string;
}

export interface StaffsDetail {
  id: number;
  type: 'ADMIN' | 'STAFF';
  name: string;
  phone: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  loginId: string;
  memo: string;
  pwdChangeRequired: boolean;
  roles: [{ id: number; name: string }];
  members: Member[];
  lastLoginedAt: string;
  prescriptionReviews: PrescriptionReview[];
  message: string;
}
