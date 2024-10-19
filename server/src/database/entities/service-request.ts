import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Guest } from './guest.entity';

@Entity('service_requests')
export class ServiceRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ default: 'pending' })
  status: string;

  @ManyToOne(() => Guest, (guest) => guest.serviceRequests)
  guest: Guest;

  @Column({ nullable: true })
  guestId: number;
}