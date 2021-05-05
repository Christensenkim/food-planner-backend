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
    this.mealService.updateMeal(data.id, data);
    this.server.emit('allMeals', await this.mealService.getMeals());
    return data;
  }

  @SubscribeMessage('deleteMeal')
  async handleDeleteMealEvent(@MessageBody() data: Meal): Promise<Meal> {
    this.mealService.deleteMeal(data.id);
    this.server.emit('allMeals', await this.mealService.getMeals());
    return data;
  }

  @SubscribeMessage('createMeal')
  async handleCreateMealEvent(@MessageBody() data: CreateMealDto): Promise<Meal> {
    this.mealService.createMeal(data);
    this.server.emit('allMeals', await this.mealService.getMeals());
    return <Meal>data;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async handleConnection(client: Socket, ...args: any[]): Promise<any> {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async handleDisconnect(client: Socket): Promise<any> {}
}
