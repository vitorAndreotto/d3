import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { logger } from '@utils/logger';

@Injectable()
export class SqlInjectionMiddleware implements NestMiddleware {
  private sqlInjectionPattern = /(\b(union|select|insert|update|delete|drop|alter|create|rename|truncate|replace|exec|execute)\b|\b(from|into|where|group|having|order)\b.*\b(union|select|insert|update|delete|drop|alter|create|rename|truncate|replace|exec|execute)\b)|('.*--)|(--)|(#.*\n)|(\/\*.*\*\/)/i;

  private isSqlInjectionAttempt(value: string): boolean {
    return this.sqlInjectionPattern.test(value);
  }

  private checkObject(obj: any): void {
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (typeof obj[key] === 'string' && this.isSqlInjectionAttempt(obj[key])) {
          logger.warn('SqlInjectionMiddleware', `SQL Injection attempt detected in value: ${obj[key]}`);
          throw new BadRequestException('Caracteres inválidos detectados na requisição');
        } else if (typeof obj[key] === 'object') {
          this.checkObject(obj[key]);
        }
      }
    }
  }

  use(req: Request, res: Response, next: NextFunction) {
    try {
      // Verifica query params
      if (req.query) {
        this.checkObject(req.query);
      }

      // Verifica body
      if (req.body) {
        this.checkObject(req.body);
      }

      // Verifica params
      if (req.params) {
        this.checkObject(req.params);
      }

      next();
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      logger.error('SqlInjectionMiddleware', error);
      throw new BadRequestException('Erro ao processar a requisição');
    }
  }
}
