import * as React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { socketService } from '../utils/socket.service';
import { useDidMount } from '../utils/hooksUtils';
import { ISchedule } from '../types/types';
import { sstorage } from '../utils/storage';
import { scheduleService } from '../utils/schedule.service';

export function useSchedules() {
  const [schedules, setSchedules] = React.useState<ISchedule[]>([]);

  useDidMount(() => {
    socketService.on('newSchedule', onNewSchedule);
    socketService.emit('getSchedules');
    socketService.on('getSchedules', onGetSchedules);
    socketService.on('addSchedule', onNewSchedule);
  });

  function onGetSchedules(schedules: ISchedule[]) {
    setSchedules(schedules.map(item => scheduleService.parseSchedule(item)));
  }

  function onNewSchedule(event: ISchedule) {
    setSchedules(prev => {
      return [...prev, scheduleService.parseSchedule(event)];
    });
  }

  function createSchedule(schedule) {
    const user = sstorage.getUser()!;
    socketService.emit('addSchedule', {
      id: new Date().getTime().toString(),
      title: user.name,
      start: schedule.start,
      end: schedule.end,
      userId: user.id,
      color: user.color
    });
  }

  return {
    schedules,
    createSchedule
  };
}
