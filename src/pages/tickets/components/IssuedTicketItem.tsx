import React from 'react';
import Card from '@components/common/Card';
import { IssuedTicketsData } from '@/types/tickets/tickets';
import { LessonTypeEnum } from '@/enums/Ticket';
import { ReactComponent as Ticket } from '@/assets/icons/Ticket.svg';

const IssuedTicketItem = ({ ticket }: { ticket: IssuedTicketsData }) => (
  <Card>
    <article className="w-[30rem] p-6">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="my-2 font-bold">{ticket.title}</p>
          <p className="text-sm text-primary-500">{LessonTypeEnum[ticket.lessonType]}</p>
        </div>
        <Ticket />
      </div>

      <div className="flex items-end justify-between">
        <ul>
          <li>
            <span className="inline-block w-20 text-text-400">잔여 횟수</span> {ticket.remainingCount}회
          </li>
          <li>
            <span className="inline-block w-20 text-text-400">유효 기간</span> {ticket.startAt} - {ticket.endAt}
          </li>
        </ul>
      </div>
    </article>
  </Card>
);
export default IssuedTicketItem;
