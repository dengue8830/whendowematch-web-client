import * as React from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import styled from "styled-components";
import { ISchedule, IUser } from "../types/types";
import { useSchedules } from "../hooks/useSchedule";

interface IProps {}

const localizer = momentLocalizer(moment);

function getEventStyle(event: ISchedule, start, end, isSelected) {
  let newStyle = {
    backgroundColor: event.color,
    color: "white",
    borderRadius: "5px",
    border: "none"
  };

  // if (event.isMine) {
  //   newStyle.backgroundColor = "lightgreen"
  // }

  return {
    className: "",
    style: newStyle
  };
}

export function Calendar(props: IProps) {
  const { schedules, createSchedule } = useSchedules();

  function onSelectSlot(slot) {
    createSchedule({
      start: slot.start,
      end: slot.end
    });
  }

  return (
    <Container>
      <BigCalendar
        localizer={localizer}
        events={schedules}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
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
`;
