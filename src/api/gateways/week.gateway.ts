import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WeekService } from '../../core/services/week.service';
import { Inject } from '@nestjs/common';
import { IWeekServiceProvider } from '../../core/primary-ports/week.service.interface';
import { Socket } from 'socket.io';
import { Week } from '../../core/models/week.model';

@WebSocketGateway()
export class WeekGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(@Inject(IWeekServiceProvider) private weekService: WeekService) {}

  @WebSocketServer() server;

  @SubscribeMessage('get-weeks')
  handleGetWeekEvent(@MessageBody() data: Week): Week {
    this.server.emit('return-all-stocks', this.weekService.getAllWeeks());
    return data;
  }

  @SubscribeMessage('create-new-week')
  handleWeekEvent(@MessageBody() data: Week): Week {
    this.weekService.addWeek(data);
    this.server.emit('return-all-stocks', this.weekService.getAllWeeks());
    return data;
  }
  @SubscribeMessage('update-week')
  handleUpdateWeekEvent(@MessageBody() data: Week): Week {
    this.weekService.updateWeek(data.id, data);
    this.server.emit('return-all-stocks', this.weekService.getAllWeeks());
    return data;
  }
  @SubscribeMessage('delete-week')
  handleDeleteWeekEvent(@MessageBody() data: Week): Week {
    this.weekService.deleteWeek(data.id);
    this.server.emit('return-all-stocks', this.weekService.getAllWeeks());
    return data;
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<any> {}

  async handleDisconnect(client: Socket): Promise<any> {}
}
