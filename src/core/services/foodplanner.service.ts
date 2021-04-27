import { Injectable } from '@nestjs/common';
import { IMealService } from '../primary-ports/meal.service.interface';
import { Week } from '../models/week.model';
import { Meal } from '../models/meal.model';
import { InjectRepository } from '@nestjs/typeorm';
import { MealEntity } from '../../infrastructure/meal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FoodplannerService implements IMealService {
  constructor(
    @InjectRepository(MealEntity)
    private mealRepository: Repository<MealEntity>,
  ) {}

  findMeal(mealID: number): Meal {
    return undefined;
  }

  addWeek( userID: number, monday: number, tuesday: number, wednesday: number, thursday: number, friday: number, saturday: number, sunday: number): Week {
    const newWeek: Week = {
      id: 0,
      userID: userID,
      monday: this.findMeal(monday),
      tuesday: this.findMeal(tuesday),
      wednesday: this.findMeal(wednesday),
      thursday: this.findMeal(thursday),
      friday: this.findMeal(friday),
      saturday: this.findMeal(saturday),
      sunday: this.findMeal(sunday),
    };
    return newWeek;
  }
}
