import { Test, TestingModule } from '@nestjs/testing';
import { SqlInjectionMiddleware } from './sql-injection.middleware';
import { BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

jest.mock('@utils/logger');

describe('SqlInjectionMiddleware', () => {
  let middleware: SqlInjectionMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SqlInjectionMiddleware],
    }).compile();

    middleware = module.get<SqlInjectionMiddleware>(SqlInjectionMiddleware);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  describe('use', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
      mockRequest = {};
      mockResponse = {};
      nextFunction = jest.fn();
    });

    it('should pass valid requests', () => {
      mockRequest = {
        query: { name: 'John Doe' },
        body: { email: 'john@example.com' },
        params: { id: '123' },
      };

      middleware.use(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
    });

    it('should detect SQL injection in query params', () => {
      mockRequest = {
        query: { name: "SELECT * FROM users;" },
      };

      expect(() => {
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction);
      }).toThrow(BadRequestException);
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should detect SQL injection in body', () => {
      mockRequest = {
        body: { email: 'DROP TABLE users;' },
      };

      expect(() => {
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction);
      }).toThrow(BadRequestException);
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should detect SQL injection in nested objects', () => {
      mockRequest = {
        body: {
          user: {
            name: 'John',
            query: 'SELECT * FROM users;',
          },
        },
      };

      expect(() => {
        middleware.use(mockRequest as Request, mockResponse as Response, nextFunction);
      }).toThrow(BadRequestException);
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should handle null and undefined values', () => {
      mockRequest = {
        query: { name: null },
        body: { email: undefined },
        params: {},
      };

      middleware.use(mockRequest as Request, mockResponse as Response, nextFunction);
      expect(nextFunction).toHaveBeenCalled();
    });
  });
});
