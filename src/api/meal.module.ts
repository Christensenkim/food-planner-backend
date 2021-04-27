import { Module } from '@nestjs/common';
import { MealGateway } from './gateways/meal.gateway';
import { FoodplannerService } from '../core/services/foodplanner.service';
import { IMealServiceProvider } from '../core/primary-ports/meal.service.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeekEntity } from '../infrastructure/week.entity';
import { MealEntity } from '../infrastructure/meal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeekEntity, MealEntity])],
  providers: [
    FoodplannerService,
    MealGateway,
    {
      provide: IMealServiceProvider,
      useClass: FoodplannerService,
    },
  ],
})
export class MealModule {}
