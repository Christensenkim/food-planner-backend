import { Meal } from './meal.model';

export interface Week {
  id: number;
  userID: number;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}
