import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodplanerService } from './core/services/foodplaner.service';
import { MealModule } from './api/meal.module';
import { DatabaseModule } from './infrastructure/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MealModule, DatabaseModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, FoodplanerService],
})
export class AppModule {}
