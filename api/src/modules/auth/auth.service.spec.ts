import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');
jest.mock('@utils/logger');

type MockUsuarioService = {
  [K in keyof UsuarioService]: jest.Mock;
} & {
  findByLogin: jest.Mock;
};

describe('AuthService', () => {
  let service: AuthService;
  let mockUsuarioService: MockUsuarioService;
  let mockJwtService: jest.Mocked<JwtService>;
  let mockConfigService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    mockUsuarioService = {
      login: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    } as MockUsuarioService;

    mockJwtService = {
      sign: jest.fn(),
    } as any as jest.Mocked<JwtService>;

    mockConfigService = {
      get: jest.fn(),
    } as any as jest.Mocked<ConfigService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsuarioService,
          useValue: mockUsuarioService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return a JWT token when credentials are valid', async () => {
      const loginDto = {
        login: 'testuser',
        senha: 'password',
      };

      const user = {
        id: '1',
        login: 'testuser',
        nome: 'Test User',
      };

      const token = 'jwt-token';

      mockUsuarioService.login.mockResolvedValue(user);
      mockJwtService.sign.mockReturnValue(token);
      mockConfigService.get.mockReturnValue('1h');

      const result = await service.login(loginDto);

      expect(result).toEqual({
        access_token: token,
        user: {
          id: user.id,
          login: user.login,
          nome: user.nome,
        },
      });
      expect(mockUsuarioService.login).toHaveBeenCalledWith(loginDto);
      expect(mockJwtService.sign).toHaveBeenCalledWith(
        { sub: user.id, login: user.login },
        { expiresIn: '1h' }
      );
    });

    it('should throw UnauthorizedException when user is not found', async () => {
      const loginDto = {
        login: 'testuser',
        senha: 'password',
      };

      mockUsuarioService.login.mockRejectedValue(new Error('Login ou senha inválidos'));

      await expect(service.login(loginDto)).rejects.toThrow('Credenciais inválidas');
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      const loginDto = {
        login: 'testuser',
        senha: 'wrongpassword',
      };

      mockUsuarioService.login.mockRejectedValue(new Error('Login ou senha inválidos'));

      await expect(service.login(loginDto)).rejects.toThrow('Credenciais inválidas');
    });
  });
});
