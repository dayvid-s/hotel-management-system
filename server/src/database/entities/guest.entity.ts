import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';
import { ServiceRequest } from './service-request';

@Entity('guests')
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  roomId: number;

  @Column({ nullable: true })
  requests: string;

  @OneToMany(() => Reservation, (reservation) => reservation.guest)
  reservations: Reservation[];

  @OneToMany(() => ServiceRequest, (serviceRequest) => serviceRequest.guest)
  serviceRequests: ServiceRequest[];
}