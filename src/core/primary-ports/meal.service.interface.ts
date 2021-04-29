import { Meal } from '../models/meal.model';

export const IMealServiceProvider = 'IMealServiceProvider';

export interface IMealService {
  findMeal(mealID: number): Promise<Meal>;
}
