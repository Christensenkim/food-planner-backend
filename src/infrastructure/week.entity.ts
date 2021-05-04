import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WeekEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weekNumber: number;

  @Column({ nullable: true })
  monday: number | undefined;

  @Column({ nullable: true })
  tuesday: number | undefined;

  @Column({ nullable: true })
  wednesday: number | undefined;

  @Column({ nullable: true })
  thursday: number | undefined;

  @Column({ nullable: true })
  friday: number | undefined;

  @Column({ nullable: true })
  saturday: number | undefined;

  @Column({ nullable: true })
  sunday: number | undefined;
}
