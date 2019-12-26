import * as React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import styled from 'styled-components';
import { socketService } from '../utils/socket.service';
import { useDidMount } from '../utils/hooksUtils';
import { ISchedule, IUser } from '../types/types';
import { sstorage } from '../utils/storage';

interface IProps {
}

const localizer = momentLocalizer(moment)

function getEventStyle(event: ISchedule, start, end, isSelected) {
  let newStyle = {
    backgroundColor: event.color,
    color: 'white',
    borderRadius: '5px',
    border: 'none'
  };

  // if (event.isMine) {
  //   newStyle.backgroundColor = "lightgreen"
  // }

  return {
    className: '',
    style: newStyle
  };
}
// const someevents = [{
//   title: 'some title',
//   start: new Date(),
//   end: moment().add(1, 'hour').toDate(),
//   // allDay: false
//   // resource?: any,
// }];

function parseEvent(schedule: ISchedule) {
  return {
    ...schedule,
    start: new Date(schedule.start),
    end: new Date(schedule.end)
  }
}

function useSchedules() {
  const [events, setSchedules] = React.useState<ISchedule[]>([]);

  useDidMount(() => {
    socketService.on('newSchedule', onNewSchedule);
    socketService.emit('getSchedules');
    socketService.on('getSchedules', onGetSchedules);
    socketService.on('addSchedule', onNewSchedule);
  });

  function onGetSchedules(schedules: ISchedule[]) {
    setSchedules(schedules.map(item => parseEvent(item)));
  }

  function onNewSchedule(event: ISchedule) {
    setSchedules(prev => {
      return [...prev, parseEvent(event)];
    });
  }

  function createSchedule(schedule) {
    const user = sstorage.getUser()!;
    socketService.emit('addSchedule', {
      title: user.name,
      start: schedule.start,
      end: schedule.end,
      userId: user.id,
      color: user.color
    });
  }

  return {
    events,
    createEvent: createSchedule
  }
}

export function Calendar(props: IProps) {
  const { events, createEvent } = useSchedules();

  function onSelectSlot(slot) {
    createEvent({
      title: 'martin event',
      start: slot.start,
      end: slot.end
    });
  }

  return (
    <Container>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        defaultView='week'
        selectable
        onSelectSlot={onSelectSlot}
        toolbar={false}
        eventPropGetter={getEventStyle}
      />
    </Container>
  );
}

const Container = styled.div`
  height: 500px;
`