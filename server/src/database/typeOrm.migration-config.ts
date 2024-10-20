import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { Guest } from './entities/guest.entity';
import { Log } from './entities/log.entity';
import { Reservation } from './entities/reservation.entity';
import { Room } from './entities/room.entity';
import { ServiceRequest } from './entities/service-request';

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [User, Room, Guest, Reservation, ServiceRequest, Log],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false
};

export default new DataSource(dataSourceOptions);