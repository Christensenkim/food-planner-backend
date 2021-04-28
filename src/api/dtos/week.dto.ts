import { Meal } from '../../core/models/meal.model';

export interface WeekDto {
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
