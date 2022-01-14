import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as moment from 'moment';
import { utilities } from 'nest-winston';
const { errors, combine, json, timestamp, ms, prettyPrint } = winston.format;

@Injectable()
export class MyLogger implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: combine(
        errors({ stack: true }),
        json(),
        timestamp({ format: 'isoDateTime' }),
        ms(),
        prettyPrint(),
      ),
      transports: [
        new winston.transports.File({
          level: 'error',
          filename: `error(${moment(new Date()).format('YYYY.MM.DD')}).log`,
          dirname: 'logs',
          maxsize: 5000000,
        }),
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
          format: combine(utilities.format.nestLike()),
        }),

        new winston.transports.File({
          filename: `application(${moment(new Date()).format(
            'YYYY.MM.DD',
          )}).log`,
          dirname: 'logs',
          maxsize: 5000000,
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
