import { Injectable } from '@nestjs/common';
import { IMealService } from '../primary-ports/meal.service.interface';

@Injectable()
export class FoodplanerService implements IMealService {}
