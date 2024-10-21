import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  number: string;

  @Column()
  type: string;

  @Column()
  status: string;

  @Column('decimal')
  price: number;

  @Column({ default: false })
  isReserved: boolean;

  @Column({ type: 'timestamp', nullable: true })
  checkIn?: Date;

  @Column({ type: 'timestamp', nullable: true })
  checkOut?: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.room)
  reservations: Reservation[];
}