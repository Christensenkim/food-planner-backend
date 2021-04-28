import { Week } from '../models/week.model';
import { Meal } from '../models/meal.model';
import { CreateMealDto } from '../../api/dtos/create-meal.dto';
import { UpdateMealDto } from '../../api/dtos/update-meal.dto';

export const IMealServiceProvider = 'IMealServiceProvider';

export interface IMealService {
  findMealById(mealID: number);

  getMeals();

  deleteMeal(id: number): void;

  createMeal(createMeal: CreateMealDto): Promise<CreateMealDto>;

  updateMeal(id: number, updateMeal: UpdateMealDto);
}
