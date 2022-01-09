import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const isProduction = (process.env.NODE_ENV || 'development') === 'production';

const dbModule = isProduction
  ? TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'username',
      password: 'password',
      database: 'database',
      entities: ['dist/**/*.entity{.ts,.js}'],
      timezone: '+09:00',
      synchronize: false,
      autoLoadEntities: true,
    })
  : TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'username',
      password: 'password',
      database: 'password',
      entities: ['dist/**/*.entity{.ts,.js}'],
      timezone: '+09:00',
      synchronize: true,
      autoLoadEntities: true,
    });

@Module({
  imports: [dbModule],
})
export class MainDBModule {}
