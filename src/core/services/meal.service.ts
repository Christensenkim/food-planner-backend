import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  daysPlanned: number;

  async findMeal(mealID: number): Promise<Meal> {
    const mealDB = await this.mealRepository.find();
    const meal = mealDB.find((m) => m.id == mealID);
    if (meal != undefined) {
      this.daysPlanned++;
      return meal;
    } else {
      throw new HttpException('Meal not found', HttpStatus.NOT_FOUND);
    }
  }

  resetDaysPlanned(): void {
    this.daysPlanned = 0;
  }
}
