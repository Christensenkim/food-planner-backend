import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealEntity } from '../../infrastructure/meal.entity';
import { Repository } from 'typeorm';
import { Meal } from '../models/meal.model';
import { IMealService } from '../primary-ports/meal.service.interface';
import { CreateMealDto } from '../../api/dtos/create-meal.dto';

@Injectable()
export class MealService implements IMealService {
  allMeals: Meal[] = [];

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
      return undefined;
    }
  }

  resetDaysPlanned(): void {
    this.daysPlanned = 0;
  }

  async createMeal(createMeal: CreateMealDto): Promise<CreateMealDto> {
    let newMeal = this.mealRepository.create();
    newMeal.name = createMeal.name;
    newMeal.ingredients = createMeal.ingredients;
    newMeal.directions = createMeal.directions;
    newMeal.description = createMeal.description;
    newMeal = await this.mealRepository.save(newMeal);
    return newMeal;
  }

  async deleteMeal(id: number) {
    const deleteMeal = await this.mealRepository.delete(id);
    if (!deleteMeal.affected) {
      throw new HttpException(
        'Meal not found for deleting',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getMeals(): Promise<Meal[]> {
    this.allMeals = await this.mealRepository.find();
    return this.allMeals;
  }

  async getMealByID(id: number): Promise<Meal> {
    const mealByID = await this.mealRepository.findOne(id);
    return mealByID;
  }

  async updateMeal(id: number, updateMeal: Meal) {
    await this.mealRepository.update(id, updateMeal);
    const updatedMeal = await this.mealRepository.findOne(id);
    if (updatedMeal) {
      return updatedMeal;
    }
    throw new HttpException('Meal not found for update', HttpStatus.NOT_FOUND);
  }
}
