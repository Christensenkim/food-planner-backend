import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { WeekService } from '../../core/services/week.service';

@WebSocketGateway()
export class WeekGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private weekService: WeekService) {}

  handleConnection(client: any, ...args: any[]): any {}

  handleDisconnect(client: any): any {}
}
