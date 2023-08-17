import { allFieldsCompleted } from '@/utils/button';
import { CreateTicketType } from '@/types/tickets/tickets';
import { ScheduleEditData } from '@/types/schedule/schedule';

interface CompleteButtonProps {
  state: CreateTicketType | ScheduleEditData;
  text: string;
}

const CompleteButton = ({ state, text }: CompleteButtonProps) => (
  <button
    className={`my-5 py-3 rounded mt-36 w-full ${
      allFieldsCompleted(state) ? 'bg-primary-500 text-white' : 'bg-bg-100 text-text-400 pointer-events-none'
    }`}
    type="submit">
    {text}
  </button>
);
export default CompleteButton;
