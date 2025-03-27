import { Test, TestingModule } from '@nestjs/testing';
import { FormularioService } from '../formulario.service';
import { Repository } from 'typeorm';
import { Formulario } from '../entidades/formulario.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from '../../usuario/entidades/usuario.entity';
import { CreateFormularioDto } from '../dto/create-formulario.dto';
import { PerguntaService } from '../../pergunta/pergunta.service';

describe('FormularioService', () => {
  let service: FormularioService;
  let mockFormularioRepository: jest.Mocked<Repository<Formulario>>;

  const mockUser: Usuario = {
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

  const mockPerguntaService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    mockFormularioRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      softDelete: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FormularioService,
        {
          provide: getRepositoryToken(Formulario),
          useValue: mockFormularioRepository,
        },
        {
          provide: PerguntaService,
          useValue: mockPerguntaService,
        },
      ],
    }).compile();

    service = module.get<FormularioService>(FormularioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new form', async () => {
      const createDto: CreateFormularioDto = {
        nome: 'Test Form',
        rota: 'test-form',
        titulo: 'Test Title',
        descricao: 'Test Description',
        tituloFinal: 'Test Final Title',
        descricaoFinal: 'Test Final Description',
        corPrincipal: '#FFFF00',
        corTexto: '#FFFFFF',
        tipo: 'padrao',
        imagemFundo: 'background.jpg',
        corFundo: '#000000'
      };

      const expectedResult: Formulario = {
        id: '1',
        nome: 'Test Form',
        rota: 'test-form',
        titulo: 'Test Title',
        descricao: 'Test Description',
        tituloFinal: 'Test Final Title',
        descricaoFinal: 'Test Final Description',
        corPrincipal: '#FFFF00',
        corTexto: '#FFFFFF',
        tipo: 'padrao',
        imagemFundo: 'background.jpg',
        corFundo: '#000000',
        criadoEm: new Date(),
        criadoPorId: mockUser.id,
        criadoPor: mockUser,
        atualizadoEm: null,
        atualizadoPorId: null,
        atualizadoPor: null,
        deletadoEm: null,
        deletadoPorId: null,
        deletadoPor: null,
        perguntas: []
      };

      mockFormularioRepository.create.mockReturnValue(expectedResult);
      mockFormularioRepository.save.mockResolvedValue(expectedResult);

      const result = await service.create(createDto, mockUser);

      expect(result).toEqual(expectedResult);
      expect(mockFormularioRepository.create).toHaveBeenCalledWith({
        ...createDto,
        criadoPor: mockUser,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of forms', async () => {
      const expectedResult: Formulario[] = [
        {
          id: '1',
          nome: 'Test Form',
          rota: 'test-form',
          titulo: 'Test Title',
          descricao: 'Test Description',
          tituloFinal: 'Test Final Title',
          descricaoFinal: 'Test Final Description',
          corPrincipal: '#FFFF00',
          corTexto: '#FFFFFF',
          tipo: 'padrao',
          imagemFundo: 'background.jpg',
          corFundo: '#000000',
          criadoEm: new Date(),
          criadoPorId: '1',
          criadoPor: mockUser,
          atualizadoEm: null,
          atualizadoPorId: null,
          atualizadoPor: null,
          deletadoEm: null,
          deletadoPorId: null,
          deletadoPor: null,
          perguntas: []
        },
      ];

      mockFormularioRepository.find.mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a form by id', async () => {
      const expectedResult: Formulario = {
        id: '1',
        nome: 'Test Form',
        rota: 'test-form',
        titulo: 'Test Title',
        descricao: 'Test Description',
        tituloFinal: 'Test Final Title',
        descricaoFinal: 'Test Final Description',
        corPrincipal: '#FFFF00',
        corTexto: '#FFFFFF',
        tipo: 'padrao',
        imagemFundo: 'background.jpg',
        corFundo: '#000000',
        criadoEm: new Date(),
        criadoPorId: '1',
        criadoPor: mockUser,
        atualizadoEm: null,
        atualizadoPorId: null,
        atualizadoPor: null,
        deletadoEm: null,
        deletadoPorId: null,
        deletadoPor: null,
        perguntas: []
      };

      mockFormularioRepository.findOne.mockResolvedValue(expectedResult);

      const result = await service.findOne('1');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should soft delete a form', async () => {
      const id = '1';
      const formulario = {
        id: '1',
        nome: 'Test Form',
        rota: 'test-form',
        titulo: 'Test Title',
        descricao: 'Test Description',
        tituloFinal: 'Test Final Title',
        descricaoFinal: 'Test Final Description',
        corPrincipal: '#FFFF00',
        corTexto: '#FFFFFF',
        tipo: 'padrao',
        imagemFundo: 'background.jpg',
        corFundo: '#000000',
        criadoEm: new Date(),
        criadoPorId: '1',
        criadoPor: mockUser,
        atualizadoEm: null,
        atualizadoPorId: null,
        atualizadoPor: null,
        deletadoEm: null,
        deletadoPorId: null,
        deletadoPor: null,
        perguntas: []
      };

      mockFormularioRepository.findOne.mockResolvedValue(formulario);
      mockFormularioRepository.save.mockResolvedValue({ ...formulario, deletadoPor: mockUser });
      mockFormularioRepository.softDelete.mockResolvedValue({
        affected: 1,
        raw: [],
        generatedMaps: []
      });

      await service.remove(id, mockUser);

      expect(mockFormularioRepository.findOne).toHaveBeenCalledWith({
        where: { id }
      });
      expect(mockFormularioRepository.save).toHaveBeenCalledWith({
        ...formulario,
        deletadoPor: mockUser
      });
      expect(mockFormularioRepository.softDelete).toHaveBeenCalledWith(id);
    });
  });
});
