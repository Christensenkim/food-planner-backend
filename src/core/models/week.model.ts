import { Meal } from './meal.model';

export interface Week {
  id: number;
  userID: number;
  monday: Meal;
  tuesday: Meal;
  wednesday: Meal;
  thursday: Meal;
  friday: Meal;
  saturday: Meal;
  sunday: Meal;
}
