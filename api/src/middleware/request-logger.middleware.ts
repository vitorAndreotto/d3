import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body } = req;

    let payload = null;
    
    if (Object.keys(body).length > 0) {
      // Remove senha do log por segurança
      const sanitizedBody = { ...body };
      if (sanitizedBody.senha) {
        sanitizedBody.senha = '********';
      }

      payload = sanitizedBody;
    }

    console.log(
      '\x1b[36m%s\x1b[0m %s \x1b[33m%s\x1b[0m %s \x1b[34m%s\x1b[0m',
      `[${method}] ${originalUrl}`, // 1º valor (ciano)
      '',                           // 2º valor (vazio)
      'Payload:',                   // 3º valor (amarelo)
      '',                           // 4º valor (vazio)
      JSON.stringify(payload, null, 2) // 5º valor (verde)
    );
    
    next();
  }
}
