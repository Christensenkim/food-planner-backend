import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MealEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public ingredients: string;

  @Column()
  public directions: string;

  @Column()
  public description: string;

  @Column({ nullable: true })
  public picName: string;
}
