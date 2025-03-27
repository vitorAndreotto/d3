import { Test, TestingModule } from '@nestjs/testing';
import { FormularioController } from '../formulario.controller';
import { FormularioService } from '../formulario.service';
import { Usuario } from '../../usuario/entidades/usuario.entity';
import { CreateFormularioDto } from '../dto/create-formulario.dto';
import { PerguntaService } from '../../pergunta/pergunta.service';

describe('FormularioController', () => {
  let controller: FormularioController;

  const mockFormularioService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockPerguntaService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

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

  const mockRequest = {
    user: mockUser,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormularioController],
      providers: [
        {
          provide: FormularioService,
          useValue: mockFormularioService,
        },
        {
          provide: PerguntaService,
          useValue: mockPerguntaService,
        },
      ],
    }).compile();

    controller = module.get<FormularioController>(FormularioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new form', async () => {
      const createFormularioDto: CreateFormularioDto = {
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

      const expectedResult = {
        id: '1',
        ...createFormularioDto,
        criadoPor: mockUser,
      };

      mockFormularioService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createFormularioDto, mockRequest);

      expect(result).toEqual(expectedResult);
      expect(mockFormularioService.create).toHaveBeenCalledWith(
        createFormularioDto,
        mockUser,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of forms', async () => {
      const expectedResult = [
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
          corFundo: '#000000'
        },
      ];

      mockFormularioService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a form', async () => {
      const expectedResult = {
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
        corFundo: '#000000'
      };

      mockFormularioService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne('1');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should remove a form', async () => {
      const expectedResult = { id: '1' };

      mockFormularioService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove('1', mockRequest);

      expect(result).toEqual(expectedResult);
      expect(mockFormularioService.remove).toHaveBeenCalledWith('1', mockUser);
    });
  });
});
