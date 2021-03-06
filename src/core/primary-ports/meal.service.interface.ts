import { Meal } from '../models/meal.model';
import { CreateMealDto } from '../../api/dtos/create-meal.dto';

export const IMealServiceProvider = 'IMealServiceProvider';

export interface IMealService {
  findMeal(mealID: number): Promise<Meal>;

  getMeals();

  deleteMeal(id: number): void;

  createMeal(createMeal: CreateMealDto): Promise<CreateMealDto>;

  updateMeal(id: number, updateMeal: Meal);
}
