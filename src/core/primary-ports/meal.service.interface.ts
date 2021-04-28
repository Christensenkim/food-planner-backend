import { Week } from '../models/week.model';
import { Meal } from '../models/meal.model';

export const IMealServiceProvider = 'IMealServiceProvider';

export interface IMealService {
  findMeal(mealID: number): Meal;
}
