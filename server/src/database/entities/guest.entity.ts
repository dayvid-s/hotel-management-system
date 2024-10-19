import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('guests')
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ nullable: true })
  roomId: number;

  @Column({ nullable: true })
  requests: string;
}
