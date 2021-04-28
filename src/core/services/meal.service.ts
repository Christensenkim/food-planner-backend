import { Injectable } from '@nestjs/common';
import { IWeekService } from '../primary-ports/week.service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { MealEntity } from '../../infrastructure/meal.entity';
import { Repository } from 'typeorm';
import { Meal } from '../models/meal.model';
import { IMealService } from '../primary-ports/meal.service.interface';

@Injectable()
export class MealService implements IMealService {
  constructor(
    @InjectRepository(MealEntity)
    private mealRepository: Repository<MealEntity>,
  ) {}

  findMeal(mealID: number): Meal {
    return undefined;
  }
}
