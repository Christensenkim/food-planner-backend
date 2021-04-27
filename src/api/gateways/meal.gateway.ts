import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { FoodplannerService } from '../../core/services/foodplanner.service';

@WebSocketGateway()
export class MealGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private foodplannerService: FoodplannerService) {}

  handleConnection(client: any, ...args: any[]): any {}

  handleDisconnect(client: any): any {}
}
