import { ISchedule, IOverlap } from '../types/types';
import moment from 'moment';

function xxx(current: ISchedule, next?: ISchedule): boolean {
  if (!next) {
    return false;
  }
  if (current.end.getDay() !== next.end.getDay()) {
    return false;
  }
  return current.end.getTime() > next.start.getTime() && current.start.getTime() < next.start.getTime();
}

export const scheduleService = {
  findMatches(items: ISchedule[]): IOverlap[] {
    // return schedules.length ? [schedules[0]] : [];
    items.sort((a, b) => {
      return a.start.getTime() * -1
    });
    console.log('items', items);
    const overlaps: IOverlap[] = [];
    // for (var i = 0; i < items.length; i++) {
    //   const next = i === items.length ? undefined : items[i + 1];
    //   const current = items[i];
    //   const thereIsOverlap = xxx(current, next);
    //   if (thereIsOverlap) {
    //     overlaps.push({
    //       start: moment(next!.start.getTime()).toDate(),
    //       end: moment(current.end.getTime()).toDate()
    //     });
    //   }
    // }
    items.forEach((current) => {
      items.forEach((next) => {
        // const next = items[i];
        // const current = current;
        if (current.id === next.id) {
          return;
        }
        const thereIsOverlap = xxx(current, next);
        if (thereIsOverlap) {
          overlaps.push({
            start: moment(next!.start.getTime()).toDate(),
            end: moment(current.end.getTime()).toDate()
          });
        }
      })
    })
    return overlaps;
  },
  parseSchedule(schedule: ISchedule) {
    return {
      ...schedule,
      start: new Date(schedule.start),
      end: new Date(schedule.end)
    }
  }
}