import { Log } from '@/database/entities/log.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLogDto } from './logs.dto';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) { }

  async create(createLogDto: CreateLogDto): Promise<Log> {
    const log = this.logRepository.create(createLogDto);
    return this.logRepository.save(log);
  }

  async findAll(): Promise<Log[]> {
    return await this.logRepository
      .createQueryBuilder('log')
      .select([
        'log.id',
        'log.name',
        'log.status',
        'log.description',
        'log.created_at',
        'log.updated_at',
      ])
      .getMany();
  }

  async findOne(id: number): Promise<Log> {
    return await this.logRepository
      .createQueryBuilder('log')
      .select([
        'log.id',
        'log.name',
        'log.status',
        'log.description',
        'log.created_at',
        'log.updated_at',
      ])
      .where('log.id = :id', { id })
      .getOne();
  }

  async remove(id: number): Promise<void> {
    await this.logRepository
      .createQueryBuilder('log')
      .delete()
      .where('log.id = :id', { id })
      .execute();
  }
}