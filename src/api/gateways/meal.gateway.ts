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

@WebSocketGateway()
export class MealGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(@Inject(IMealServiceProvider) private mealService: MealService) {}

  @WebSocketServer() server;

  async handleConnection(client: Socket, ...args: any[]): Promise<any> {
    this.server.emit('meals', await this.mealService.getMeals());
  }
  async handleDisconnect(client: Socket): Promise<any> {}
}
