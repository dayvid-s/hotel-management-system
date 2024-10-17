import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT') || 5432,
        username: configService.get('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [`${__dirname}/**/entities/*.{ts,js}`],
        migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
        synchronize: false,
      }),
      inject: [ConfigService]
    })
  ]
})
export class DatabaseModule { }