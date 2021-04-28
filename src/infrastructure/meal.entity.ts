import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class MealEntity {
  @PrimaryColumn({ unique: true })
  public id: number;

  @Column()
  public name: string;

  @Column()
  public userID: number;

  @Column()
  public ingredients: string;

  @Column()
  public directions: string;

  @Column()
  public description: string;
}
