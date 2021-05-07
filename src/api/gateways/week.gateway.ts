import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Inject } from '@nestjs/common';
import {
  IWeekService,
  IWeekServiceProvider,
} from '../../core/primary-ports/week.service.interface';
import { Socket } from 'socket.io';
import { Week } from '../../core/models/week.model';

@WebSocketGateway()
export class WeekGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(IWeekServiceProvider) private weekService: IWeekService,
  ) {}

  @WebSocketServer() server;

  @SubscribeMessage('get-weekoverview')
  handleGetWeeksNewEvent(): void {
    this.server.emit('get-weekoverview', this.weekService.sendMockData());
  }

  @SubscribeMessage('get-weeks')
  async handleGetWeeksEvent(): Promise<void> {
    this.server.emit('return-all-weeks', await this.weekService.getAllWeeks());
  }

  @SubscribeMessage('get-week')
  handleGetWeekEvent(@MessageBody() weekID: number): void {
    this.server.emit('return-week', this.weekService.getOneWeek(weekID));
  }

  @SubscribeMessage('create-new-week')
  async handleWeekEvent(): Promise<void> {
    this.weekService.addWeek();
    this.server.emit('return-all-weeks', await this.weekService.getAllWeeks());
  }
  @SubscribeMessage('update-week')
  async handleUpdateWeekEvent(@MessageBody() data: Week): Promise<void> {
    await this.weekService.updateWeek(data.id, data);
    this.server.emit('return-all-weeks', await this.weekService.getAllWeeks());
  }
  @SubscribeMessage('delete-week')
  handleDeleteWeekEvent(@MessageBody() data: Week): Week {
    this.weekService.deleteWeek(data.id);
    this.server.emit('return-all-weeks', this.weekService.getAllWeeks());
    return data;
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<any> {}

  async handleDisconnect(client: Socket): Promise<any> {}
}
