import { CreateTicketType } from '../types/tickets/tickets';

export const allFieldsCompleted = (state: CreateTicketType): boolean => {
  const inputs = Object.values(state);
  return inputs.every((input) => input !== '' && input !== 0);
};
