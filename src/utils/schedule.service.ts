import { ISchedule, IOverlap } from '../types/types';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

/**
 * The search flow will call this in two ways
 * -------------->
 * <--------------
 * a ----- c
 *     b ----- d
 * So in order to avoid duplicates we add each
 * range pair overlap just once.ddssss
 */
function thereIsOneWayOverlap(current: ISchedule, next: ISchedule): boolean {
  const currentRange = moment.range(current.start, current.end);
  const nextRange = moment.range(next.start, next.end);
  const isOneWay = current.end.getTime() > next.start.getTime() && current.start.getTime() < next.start.getTime();
  return currentRange.overlaps(nextRange) && isOneWay;
}

export const scheduleService = {
  findMatches(items: ISchedule[]): IOverlap[] {
    const overlaps: IOverlap[] = [];
    items.forEach((current) => {
      items.forEach((next) => {
        if (current.id === next.id) {
          return;
        }
        if (thereIsOneWayOverlap(current, next)) {
          overlaps.push({
            start: next.start,
            end: current.end
          });
        }
      });
    });
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