import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Guest } from './guest.entity';
import { Room } from './room.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Guest, (guest) => guest.reservations)
  guest: Guest;

  @ManyToOne(() => Room, (room) => room.reservations)
  room: Room;

  @Column()
  checkInDate: Date;

  @Column()
  checkOutDate: Date;
}
