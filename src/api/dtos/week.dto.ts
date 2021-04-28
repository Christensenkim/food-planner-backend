import { MealDto } from './meal.dto';

export interface WeekDto {
  id: number;
  weekNumber: number;
  userID: number;
  monday: MealDto | undefined;
  tuesday: MealDto | undefined;
  wednesday: MealDto | undefined;
  thursday: MealDto | undefined;
  friday: MealDto | undefined;
  saturday: MealDto | undefined;
  sunday: MealDto | undefined;
  daysPlanned: number;
}
