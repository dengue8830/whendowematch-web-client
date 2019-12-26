import * as React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import styled from 'styled-components';
import { socketService } from '../utils/socket.service';
import { useDidMount } from '../utils/hooksUtils';
import { IEvent, IUser } from '../types/types';

interface IProps {
}

const localizer = momentLocalizer(moment)

// const someevents = [{
//   title: 'some title',
//   start: new Date(),
//   end: moment().add(1, 'hour').toDate(),
//   // allDay: false
//   // resource?: any,
// }];

function parseEvent(event: IEvent) {
  return {
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
  }
}

function useSchedules() {
  const [events, setSchedules] = React.useState<IEvent[]>([]);

  useDidMount(() => {
    socketService.on('newSchedule', onNewSchedule);
    socketService.emit('getSchedules');
    socketService.on('getSchedules', onGetSchedules);
    socketService.on('addSchedule', onNewSchedule);
  });

  function onGetSchedules(events: IEvent[]) {
    setSchedules(events.map(item => parseEvent(item)));
  }

  function onNewSchedule(event: IEvent) {
    setSchedules(prev => {
      return [...prev, parseEvent(event)];
    });
  }

  function createEvent(event) {
    socketService.emit('addSchedule', {
      title: 'martin event',
      start: event.start,
      end: event.end
    });
  }

  return {
    events,
    createEvent
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
      />
    </Container>
  );
}

const Container = styled.div`
  height: 500px;
`