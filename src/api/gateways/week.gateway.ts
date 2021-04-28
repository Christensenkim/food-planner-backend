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
import { WeekDto } from '../dtos/week.dto';

@WebSocketGateway()
export class WeekGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(@Inject(IWeekServiceProvider) private weekService: WeekService) {}

  @WebSocketServer() server;

  @SubscribeMessage('get-weeks-new')
  handleGetWeeksNewEvent(): void {
    const weekDTO: WeekDto[] = [
      {
        id: 1,
        weekNumber: 1,
        userID: 1,
        monday: { id: 1, name: 'sphagget' },
        tuesday: undefined,
        wednesday: undefined,
        thursday: undefined,
        friday: { id: 1, name: 'sphagget' },
        saturday: undefined,
        sunday: { id: 2, name: 'Meat' },
        daysPlanned: 2,
      },
      {
        id: 2,
        weekNumber: 2,
        userID: 1,
        monday: { id: 3, name: 'rugbrød' },
        tuesday: undefined,
        wednesday: { id: 1, name: 'sphagget' },
        thursday: undefined,
        friday: undefined,
        saturday: { id: 2, name: 'Meat' },
        sunday: undefined,
        daysPlanned: 3,
      },
    ];
    this.server.emit('return-all-weeks', weekDTO);
  }

  @SubscribeMessage('get-weeks')
  handleGetWeeksEvent(): void {
    this.server.emit('return-all-weeks', this.weekService.getAllWeeks());
  }

  @SubscribeMessage('get-week')
  handleGetWeekEvent(@MessageBody() weekID: number): void {
    this.server.emit('return-week', this.weekService.getOneWeek(weekID));
  }

  @SubscribeMessage('create-new-week')
  handleWeekEvent(@MessageBody() data: Week): Week {
    this.weekService.addWeek(data);
    this.server.emit('return-all-weeks', this.weekService.getAllWeeks());
    return data;
  }
  @SubscribeMessage('update-week')
  handleUpdateWeekEvent(@MessageBody() data: Week): Week {
    this.weekService.updateWeek(data.id, data);
    this.server.emit('return-all-weeks', this.weekService.getAllWeeks());
    return data;
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
