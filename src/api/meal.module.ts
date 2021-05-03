import { Module } from '@nestjs/common';
import { MealGateway } from './gateways/meal.gateway';
import { WeekService } from '../core/services/week.service';
import { IMealServiceProvider } from '../core/primary-ports/meal.service.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeekEntity } from '../infrastructure/week.entity';
import { MealEntity } from '../infrastructure/meal.entity';
import { MealService } from '../core/services/meal.service';
import { WeekGateway } from './gateways/week.gateway';
import { IWeekServiceProvider } from '../core/primary-ports/week.service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([WeekEntity, MealEntity])],
  providers: [
    MealService,
    WeekService,
    WeekGateway,
    {
      provide: IWeekServiceProvider,
      useClass: WeekService,
    },
  ],
})
export class MealModule {}
