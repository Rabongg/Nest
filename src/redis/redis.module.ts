import { Module } from '@nestjs/common';
import * as Redis from 'redis';
import { REDIS } from './redis.constants';
import { ConfigService } from '@nestjs/config';

const redisFactory = {
  provide: REDIS,
  useFactory: (configService: ConfigService) => {
    return Redis.createClient({
      host: configService.get<string>('REDIS_HOST'),
      port: configService.get<string>('REDIS_PORT'),
    });
  },
  inject: [ConfigService],
};
@Module({
  providers: [redisFactory],
  exports: [REDIS],
})
export class RedisModule {}
