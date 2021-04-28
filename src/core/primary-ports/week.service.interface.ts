import { Week } from '../models/week.model';

export const IWeekServiceProvider = 'IWeekServiceProvider';

export interface IWeekService {
  addWeek(
    userID: number,
    monday: number,
    tuesday: number,
    wednesday: number,
    thursday: number,
    friday: number,
    saturday: number,
    sunday: number,
  ): Week;
}
