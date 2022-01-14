import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { MyLogger } from './my-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: MyLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const tempUrl = req.method + ' ' + req.url.split('?')[0];
    const _headers = JSON.stringify(req.headers ? req.headers : {});
    const _query = JSON.stringify(req.query ? req.query : {});
    const _body = JSON.stringify(req.body ? req.body : {});
    const _url = JSON.stringify(tempUrl ? tempUrl : {});
    this.loggerService.debug(
      `${_url} ${_headers} ${_query} ${_body}`.replace(/\\/, ''),
    );
    next();
  }
}
