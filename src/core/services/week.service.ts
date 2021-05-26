import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async getAllWeeks(): Promise<WeekDto[]> {
    const weeks = await this.weekRepository.find();
    const allWeeksDB: WeekDto[] = JSON.parse(JSON.stringify(weeks));
    const allWeeks: WeekDto[] = [];
    for (const weekDB of allWeeksDB) {
      const week: WeekDto = await this.getOneWeek(weekDB.id);
      allWeeks.push(week);
      this.mealService.resetDaysPlanned();
    }
    allWeeks.sort((a, b) =>
      a.weekNumber > b.weekNumber || a.id > b.id ? 1 : -1,
    );
    return allWeeks;
  }

  async getOneWeek(weekID: number): Promise<WeekDto> {
    const weeks = await this.weekRepository.find();
    const weekDB = weeks.find((w) => w.id == weekID);
    const Week: WeekDto = {
      id: weekDB.id,
      weekNumber: weekDB.weekNumber,
      monday: await this.mealService.findMeal(weekDB.monday),
      tuesday: await this.mealService.findMeal(weekDB.tuesday),
      wednesday: await this.mealService.findMeal(weekDB.wednesday),
      thursday: await this.mealService.findMeal(weekDB.thursday),
      friday: await this.mealService.findMeal(weekDB.friday),
      saturday: await this.mealService.findMeal(weekDB.saturday),
      sunday: await this.mealService.findMeal(weekDB.sunday),
      daysPlanned: this.mealService.daysPlanned,
    };
    this.mealService.resetDaysPlanned();
    return Week;
  }

  async addWeek(): Promise<void> {
    const weekToSave = this.weekRepository.create();
    weekToSave.weekNumber = this.getWeek();
    await this.weekRepository.save(weekToSave);
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

  getWeek(): number {
    const date = new Date(Date.now());
    const weekOne = new Date(date.getFullYear(), 0, 4);
    const numberOfDays = Math.floor(
      (date.getTime() - weekOne.getTime()) / 86400000,
    );
    let weekNo =
      Math.round((numberOfDays - 3 + ((weekOne.getDay() + 6) % 7)) / 7) + 1;
    if (weekNo == 0) {
      weekNo = 53;
    }
    return weekNo;
  }

  sendMockData(): WeekDto[] {
    const weekDTOs: WeekDto[] = [
      {
        id: 1,
        weekNumber: 1,
        monday: { id: 1, name: 'sphagget' },
        tuesday: undefined,
        wednesday: undefined,
        thursday: undefined,
        friday: { id: 1, name: 'sphagget' },
        saturday: undefined,
        sunday: { id: 2, name: 'Meat' },
        daysPlanned: 3,
      },
      {
        id: 2,
        weekNumber: 2,
        monday: { id: 3, name: 'rugbrød' },
        tuesday: undefined,
        wednesday: { id: 1, name: 'sphagget' },
        thursday: undefined,
        friday: undefined,
        saturday: { id: 2, name: 'Meat' },
        sunday: undefined,
        daysPlanned: 3,
      },
    ];
    debugger;
    return weekDTOs;
  }
}
