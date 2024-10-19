import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
