import React from 'react';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import BottomNav from '../components/common/BottomNav';

function schedule() {
  const calendars = [{ id: 'cal1', name: 'Personal' }];
  const initialEvents = [
    {
      id: '100',
      calendarId: 'cal1',
      title: 'Lunch',
      category: 'time',
      start: '2023-08-28T12:00:00',
      end: '2023-08-28T13:30:00',
    },
  ];

  return (
    <div>
      <Calendar
        height="500px"
        view="month"
        month={{
          dayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          visibleWeeksCount: 5,
        }}
        calendars={calendars}
        events={initialEvents}
      />
      <BottomNav />
    </div>
  );
}

export default schedule;
