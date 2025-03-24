import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from '../usuario.controller';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../entidades/usuario.entity';

describe('UsuarioController', () => {
  let controller: UsuarioController;

  const mockUsuarioService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockUser: Partial<Usuario> = {
    id: '1',
    nome: 'Test User',
    login: 'testuser',
    senha: 'password',
    criadoEm: new Date(),
    criadoPorId: null,
    criadoPor: null,
    atualizadoEm: null,
    atualizadoPorId: null,
    atualizadoPor: null,
    deletadoEm: null,
    deletadoPorId: null,
    deletadoPor: null
  };

  const mockRequest = {
    user: mockUser,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioService,
          useValue: mockUsuarioService,
        },
      ],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createDto = {
        nome: 'New User',
        login: 'newuser',
        senha: 'password',
      };

      const expectedResult = {
        id: '2',
        ...createDto,
        criadoPor: mockUser,
      };

      mockUsuarioService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createDto, mockRequest);

      expect(result).toEqual(expectedResult);
      expect(mockUsuarioService.create).toHaveBeenCalledWith(createDto, mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedResult = [
        {
          id: '1',
          nome: 'Test User',
          login: 'testuser',
        },
      ];

      mockUsuarioService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const userId = '1';
      const expectedResult = {
        id: userId,
        nome: 'Test User',
        login: 'testuser',
      };

      mockUsuarioService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne(userId);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = '1';
      const updateDto = {
        nome: 'Updated User',
      };

      const expectedResult = {
        id: userId,
        ...updateDto,
        atualizadoPor: mockUser,
      };

      mockUsuarioService.update.mockResolvedValue(expectedResult);

      const result = await controller.update(userId, updateDto, mockRequest);

      expect(result).toEqual(expectedResult);
      expect(mockUsuarioService.update).toHaveBeenCalledWith(
        userId,
        updateDto,
        mockUser,
      );
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const userId = '1';
      const expectedResult = { id: userId };

      mockUsuarioService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(userId, mockRequest);

      expect(result).toEqual(expectedResult);
      expect(mockUsuarioService.remove).toHaveBeenCalledWith(userId, mockUser);
    });
  });
});
