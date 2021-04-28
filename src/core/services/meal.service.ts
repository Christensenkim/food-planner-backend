import { Injectable } from '@nestjs/common';
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

  async findMeal(mealID: number): Promise<Meal> {
    const mealDB = await this.mealRepository.find();
    return mealDB.find((m) => m.id == mealID);
  }
}
