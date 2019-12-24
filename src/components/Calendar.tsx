// const BigCalendar = require('react-big-calendar');
import * as React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import styled from 'styled-components';
import { useDidMount } from '../utils/hooksUtils';

interface IProps {
}

const localizer = momentLocalizer(moment)

interface IEvent {
  title: string
  start: Date
  end: Date
}

const someevents = [{
  title: 'some title',
  // start: moment(),
  // end: moment().add(1, 'hour'),
  start: new Date(),
  end: moment().add(1, 'hour').toDate(),
  // allDay: false
  // resource?: any,
}];

export function Calendar(props: IProps) {
  const [events, setEvents] = React.useState<IEvent[]>([]);

  useDidMount(() => {
    // TODO: remote fetch
    setEvents(someevents);
  });

  function onSelectSlot(slot) {
    setEvents([...events, slot]);
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