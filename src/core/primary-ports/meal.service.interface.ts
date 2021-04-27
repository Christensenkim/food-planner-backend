import { Week } from '../models/week.model';
import { Meal } from '../models/meal.model';

export const IMealServiceProvider = 'IMealServiceProvider';

export interface IMealService {
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

  findMeal(mealID: number): Meal;
}
