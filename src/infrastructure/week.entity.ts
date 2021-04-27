import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class WeekEntity {
  @PrimaryColumn({ unique: true })
  id: number;

  @Column()
  userID: number;

  @Column()
  monday: number;

  @Column()
  tuesday: number;

  @Column()
  wednesday: number;

  @Column()
  thursday: number;

  @Column()
  friday: number;

  @Column()
  saturday: number;

  @Column()
  sunday: number;
}
