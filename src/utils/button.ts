import { CreateTicketType } from '../types/tickets/tickets';
import { ScheduleEditData } from '@/types/schedule/schedule';

export const allFieldsCompleted = (state: CreateTicketType | ScheduleEditData): boolean => {
  const inputs = Object.values(state);
  return inputs.every((input) => input !== '' && input !== 0);
};
