import {
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
    await this.weekService.addWeek();
    this.server.emit('return-all-weeks', await this.weekService.getAllWeeks());
  }
  @SubscribeMessage('update-week')
  async handleUpdateWeekEvent(@MessageBody() data: Week): Promise<void> {
    await this.weekService.updateWeek(data.id, data);
    this.server.emit('return-all-weeks', await this.weekService.getAllWeeks());
  }

  @SubscribeMessage('update-week-mobile')
  async handleUpdateWeekMobileEvent(@MessageBody() data: string): Promise<void> {
    const week = JSON.parse(data);
    await this.weekService.updateWeek(week.id, week);
    this.server.emit('return-all-weeks', await this.weekService.getAllWeeks());
  }
  @SubscribeMessage('delete-week')
  async handleDeleteWeekEvent(@MessageBody() weekID: number): Promise<void> {
    await this.weekService.deleteWeek(weekID);
    this.server.emit('return-all-weeks', await this.weekService.getAllWeeks());
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<any> {
    console.log(client.id);
  }

  async handleDisconnect(client: Socket): Promise<any> {
    console.log('client Disconnected');
  }
}
