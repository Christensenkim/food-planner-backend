import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MealService } from '../../core/services/meal.service';
import { Inject } from '@nestjs/common';
import { IMealServiceProvider } from '../../core/primary-ports/meal.service.interface';
import { Meal } from '../../core/models/meal.model';
import { CreateMealDto } from '../dtos/create-meal.dto';

@WebSocketGateway()
export class MealGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(@Inject(IMealServiceProvider) private mealService: MealService) {}

  @WebSocketServer() server;

  @SubscribeMessage('getMeals')
  async handleMealEvent(): Promise<void> {
    this.server.emit('allMeals', await this.mealService.getMeals());
  }

  @SubscribeMessage('updateMeal')
  async handleUpdateMealEvent(@MessageBody() data: Meal): Promise<Meal> {
    await this.mealService.updateMeal(data.id, data);
    this.server.emit('allMeals', await this.mealService.getMeals());
    return data;
  }

  @SubscribeMessage('deleteMeal')
  async handleDeleteMealEvent(@MessageBody() data: Meal): Promise<Meal> {
    await this.mealService.deleteMeal(data.id);
    this.server.emit('allMeals', await this.mealService.getMeals());
    return data;
  }

  @SubscribeMessage('createMeal')
  async handleCreateMealEvent(
    @MessageBody() data: CreateMealDto,
  ): Promise<Meal> {
    await this.mealService.createMeal(data);
    this.server.emit('allMeals', await this.mealService.getMeals());
    return <Meal>data;
  }

  @SubscribeMessage('createMeal-mobile')
  async handleCreateMealMobileEvent(
    @MessageBody() data: string,
  ): Promise<void> {
    const meal = JSON.parse(data);
    await this.mealService.createMeal(meal);
    this.server.emit('allMeals', await this.mealService.getMeals());
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<any> {
    console.log(client.id);
  }

  async handleDisconnect(client: Socket): Promise<any> {
    console.log('client Disconnected');
  }
}
