import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../entidades/usuario.entity';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException, ConflictException } from '@nestjs/common';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<Usuario>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<Usuario>>(getRepositoryToken(Usuario));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createDto = {
      nome: 'Test User',
      login: 'testuser',
      senha: 'Test@123',
    };

    it('should create a new user', async () => {
      const hashedPassword = 'hashedPassword';
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue({ ...createDto, senha: hashedPassword });
      mockRepository.save.mockResolvedValue({ id: '1', ...createDto, senha: hashedPassword });

      const result = await service.create(createDto);

      expect(result).toEqual({
        id: '1',
        nome: createDto.nome,
        login: createDto.login,
      });
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { login: createDto.login } });
      expect(bcrypt.hash).toHaveBeenCalledWith(createDto.senha, 10);
    });

    it('should throw ConflictException if login already exists', async () => {
      mockRepository.findOne.mockResolvedValue({ id: '1', ...createDto });

      await expect(service.create(createDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    const loginDto = {
      login: 'testuser',
      senha: 'Test@123',
    };

    it('should successfully login with correct credentials', async () => {
      const user = {
        id: '1',
        nome: 'Test User',
        login: loginDto.login,
        senha: 'hashedPassword',
      };

      mockRepository.findOne.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await service.login(loginDto);

      expect(result).toEqual({
        id: user.id,
        nome: user.nome,
        login: user.login,
      });
    });

    it('should throw UnauthorizedException with invalid credentials', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException with wrong password', async () => {
      const user = {
        id: '1',
        nome: 'Test User',
        login: loginDto.login,
        senha: 'hashedPassword',
      };

      mockRepository.findOne.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: '1', nome: 'User 1', login: 'user1' },
        { id: '2', nome: 'User 2', login: 'user2' },
      ];

      mockRepository.find.mockResolvedValue(users);

      const result = await service.findAll();

      expect(result).toEqual(users);
      expect(mockRepository.find).toHaveBeenCalledWith({
        select: ['id', 'nome', 'login', 'criadoEm'],
      });
    });
  });
});
