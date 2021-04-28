import { Week } from '../models/week.model';
import { WeekDto } from '../../api/dtos/week.dto';

export const IWeekServiceProvider = 'IWeekServiceProvider';

export interface IWeekService {
  addWeek(week: Week): Promise<WeekDto>;

  getAllWeeks(): Promise<Week[]>;

  getOneWeek(weekID: number): Promise<WeekDto>;

  deleteWeek(weekID: number): Promise<void>;

  updateWeek(weekID: number, week: Week): Promise<Week>;
}
