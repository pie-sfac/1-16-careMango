import { Staff } from "@/types/staffs/staffs";

export interface StateType {
  userId: number;
  memberId: number;
  clientName: string;
  clientPhone: string;
  memo: string;
  startAt: string;
  endAt: string;
  selectedStaff?: Staff;
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
