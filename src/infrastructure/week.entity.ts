import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Meal } from '../core/models/meal.model';

@Entity()
export class Week {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userID: number;

  @Column()
  monday: Meal;

  @Column()
  tuesday: Meal;

  @Column()
  wednesday: Meal;

  @Column()
  thursday: Meal;

  @Column()
  friday: Meal;

  @Column()
  saturday: Meal;

  @Column()
  sunday: Meal;
}
