import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('log')
export class Log {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  status: string;

  @Column({ type: 'varchar', length: 10000 })
  description: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
} 