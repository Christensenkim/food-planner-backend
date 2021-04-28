import { Module } from '@nestjs/common';
import { MealGateway } from './gateways/meal.gateway';
import { IMealServiceProvider } from '../core/primary-ports/meal.service.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeekEntity } from '../infrastructure/week.entity';
import { MealEntity } from '../infrastructure/meal.entity';
import { MealService } from '../core/services/meal.service';

@Module({
  imports: [TypeOrmModule.forFeature([WeekEntity, MealEntity])],
  providers: [
    MealService,
    MealGateway,
    {
      provide: IMealServiceProvider,
      useClass: MealService,
    },
  ],
})
export class MealModule {}
