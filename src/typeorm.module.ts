import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const dbModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  timezone: '+09:00',
  synchronize: true,
  autoLoadEntities: true,
});

@Module({
  imports: [dbModule],
})
export class MainDBModule {}
