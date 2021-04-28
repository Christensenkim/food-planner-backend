import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Week } from '../models/week.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IWeekService } from '../primary-ports/week.service.interface';
import { MealService } from './meal.service';
import { WeekEntity } from '../../infrastructure/week.entity';
import { WeekDto } from '../../api/dtos/week.dto';

@Injectable()
export class WeekService implements IWeekService {
  constructor(
    private mealService: MealService,
    @InjectRepository(WeekEntity)
    private weekRepository: Repository<WeekEntity>,
  ) {}

  async getAllWeeks(): Promise<Week[]> {
    const weeks = await this.weekRepository.find();
    const allWeeks: Week[] = JSON.parse(JSON.stringify(weeks));
    return allWeeks;
  }
  async getOneWeek(weekID: number): Promise<WeekDto> {
    const weeks = await this.weekRepository.find();
    const weekDB = weeks.find((w) => w.id == weekID);
    const Week: WeekDto = {
      id: weekDB.id,
      userID: weekDB.userID,
      monday: await this.mealService.findMeal(weekDB.monday),
      tuesday: await this.mealService.findMeal(weekDB.tuesday),
      wednesday: await this.mealService.findMeal(weekDB.wednesday),
      thursday: await this.mealService.findMeal(weekDB.thursday),
      friday: await this.mealService.findMeal(weekDB.friday),
      saturday: await this.mealService.findMeal(weekDB.saturday),
      sunday: await this.mealService.findMeal(weekDB.sunday),
    };
    return Week;
  }

  async addWeek(week: Week): Promise<WeekDto> {
    let weekToSave = this.weekRepository.create();
    weekToSave.id = 0;
    weekToSave.userID = week.userID;
    weekToSave.monday = week.monday;
    weekToSave.tuesday = week.tuesday;
    weekToSave.wednesday = week.wednesday;
    weekToSave.thursday = week.thursday;
    weekToSave.friday = week.friday;
    weekToSave.saturday = week.saturday;
    weekToSave.sunday = week.sunday;
    weekToSave = await this.weekRepository.save(weekToSave);
    const newWeek: WeekDto = {
      id: 0,
      userID: week.userID,
      monday: await this.mealService.findMeal(weekToSave.monday),
      tuesday: await this.mealService.findMeal(weekToSave.tuesday),
      wednesday: await this.mealService.findMeal(weekToSave.wednesday),
      thursday: await this.mealService.findMeal(weekToSave.thursday),
      friday: await this.mealService.findMeal(weekToSave.friday),
      saturday: await this.mealService.findMeal(weekToSave.saturday),
      sunday: await this.mealService.findMeal(weekToSave.sunday),
    };
    return newWeek;
  }

  async deleteWeek(weekID: number): Promise<void> {
    await this.weekRepository.delete({ id: weekID });
  }

  async updateWeek(weekID: number, week: Week): Promise<Week> {
    await this.weekRepository.update(weekID, week);
    const updatedWeek = await this.weekRepository.findOne(weekID);
    if (updatedWeek) {
      return updatedWeek;
    }
    throw new HttpException('Week not found', HttpStatus.NOT_FOUND);
  }
}
