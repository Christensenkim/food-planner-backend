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
  handleMealEvent(@MessageBody() data: Meal): Meal {
    this.server.emit('allMeals', this.mealService.getMeals());
    return data;
  }

  @SubscribeMessage('updateMeal')
  handleUpdateMealEvent(@MessageBody() data: Meal): Meal {
    this.mealService.updateMeal(data.id, data);
    this.server.emit('allMeals', this.mealService.getMeals());
    return data;
  }

  @SubscribeMessage('deleteMeal')
  handleDeleteMealEvent(@MessageBody() data: Meal): Meal {
    this.mealService.deleteMeal(data.id);
    this.server.emit('allMeals', this.mealService.getMeals());
    return data;
  }

  @SubscribeMessage('createMeal')
  handleCreateMealEvent(@MessageBody() data: CreateMealDto): Meal {
    this.mealService.createMeal(data);
    this.server.emit('allMeals', this.mealService.getMeals());
    return <Meal>data;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async handleConnection(client: Socket, ...args: any[]): Promise<any> {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async handleDisconnect(client: Socket): Promise<any> {}
}
