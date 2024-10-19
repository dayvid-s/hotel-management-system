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

  @OneToMany(() => Reservation, (reservation) => reservation.room)
  reservations: Reservation[];
}
