import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormularioService } from '../formulario.service';
import { Formulario } from '../entidades/formulario.entity';
import { NotFoundException } from '@nestjs/common';
import { Usuario } from '../../usuario/entidades/usuario.entity';

describe('FormularioService', () => {
  let service: FormularioService;
  let formularioRepository: Repository<Formulario>;

  const mockFormularioRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    softDelete: jest.fn(),
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FormularioService,
        {
          provide: getRepositoryToken(Formulario),
          useValue: mockFormularioRepository,
        },
      ],
    }).compile();

    service = module.get<FormularioService>(FormularioService);
    formularioRepository = module.get<Repository<Formulario>>(
      getRepositoryToken(Formulario),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new form', async () => {
      const createDto = {
        nome: 'Test Form',
        rota: 'test-form',
        titulo: 'Test Title',
        descricao: 'Test Description',
        tituloFinal: 'Test Final Title',
        descricaoFinal: 'Test Final Description',
        web: true,
        mobile: false,
        desktop: false
      };

      const expectedResult = {
        id: '1',
        ...createDto,
        criadoPor: mockUser,
      };

      mockFormularioRepository.create.mockReturnValue(expectedResult);
      mockFormularioRepository.save.mockResolvedValue(expectedResult);

      const result = await service.create(createDto, mockUser as Usuario);

      expect(result).toEqual(expectedResult);
      expect(mockFormularioRepository.create).toHaveBeenCalledWith({
        ...createDto,
        criadoPor: mockUser,
      });
      expect(mockFormularioRepository.save).toHaveBeenCalledWith(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return an array of forms', async () => {
      const expectedResult = [
        {
          id: '1',
          nome: 'Test Form',
        },
      ];

      mockFormularioRepository.find.mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(mockFormularioRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a form', async () => {
      const formId = '1';
      const expectedResult = {
        id: formId,
        nome: 'Test Form',
      };

      mockFormularioRepository.findOne.mockResolvedValue(expectedResult);

      const result = await service.findOne(formId);

      expect(result).toEqual(expectedResult);
      expect(mockFormularioRepository.findOne).toHaveBeenCalledWith({
        where: { id: formId },
      });
    });

    it('should throw NotFoundException when form not found', async () => {
      const formId = '1';
      mockFormularioRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(formId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a form', async () => {
      const formId = '1';
      const mockForm = {
        id: formId,
        nome: 'Test Form',
      };

      mockFormularioRepository.findOne.mockResolvedValue(mockForm);
      mockFormularioRepository.save.mockResolvedValue({
        ...mockForm,
        deletadoPor: mockUser,
      });
      mockFormularioRepository.softDelete.mockResolvedValue(undefined);

      const result = await service.remove(formId, mockUser as Usuario);

      expect(result).toEqual({ id: formId });
      expect(mockFormularioRepository.findOne).toHaveBeenCalledWith({
        where: { id: formId },
      });
      expect(mockFormularioRepository.save).toHaveBeenCalledWith({
        ...mockForm,
        deletadoPor: mockUser,
      });
      expect(mockFormularioRepository.softDelete).toHaveBeenCalledWith(formId);
    });

    it('should throw NotFoundException when form not found', async () => {
      const formId = '1';
      mockFormularioRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(formId, mockUser as Usuario)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
