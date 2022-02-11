import React, {FC} from 'react';
import {Calendar} from 'antd';
import {IEvent} from '../models/IEvent';
import {Moment} from 'moment';
import {formatDate} from '../utils/date';

interface CalendarEventProps {
  events: IEvent[];
}

const CalendarEvent: FC<CalendarEventProps> = ({events}): JSX.Element => {

  function dateCellRender(value: Moment) {
    const formattedDate = formatDate(value.toDate());
    const currentDayEvents = events.filter(ev => ev.date === formattedDate);

    return (
      <ul className='events'>
        {currentDayEvents.map((item, index) => (
          <li key={index}>
            {index + 1}. {item.description}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Calendar
      className='calendar__event'
      dateCellRender={dateCellRender}
    />
  );
};

export default CalendarEvent;
