import * as React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import styled from 'styled-components';
import { socket } from '../socket';
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

function useEvents() {
  const [events, setEvents] = React.useState<IEvent[]>([]);

  useDidMount(() => {
    // socket.on('connect', function () { console.log('connected'); });
    // socket.on('disconnect', function () { console.log('disconnected'); });
    socket.on('newEvent', onNewEvent);
    socket.emit('getEvents');
    socket.on('currentEvents', function (events: IEvent[]) {
      setEvents(events.map(item => parseEvent(item)));
    });
  });

  function onNewEvent(event: IEvent) {
    setEvents(prev => {
      return [...prev, parseEvent(event)];
    });
  }

  function createEvent(event) {
    socket.emit('addEvent', {
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
  const { events, createEvent } = useEvents();

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