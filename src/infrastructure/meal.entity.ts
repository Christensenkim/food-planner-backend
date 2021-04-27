import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public mealName: string;

  @Column()
  public userID: number;

  @Column()
  public ingredients: string[];

  @Column()
  public directions: string;

  @Column()
  public description: string;
}
