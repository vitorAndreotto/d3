import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pergunta } from './entidades/pergunta.entity';
import { CreatePerguntaDto } from './dto/create-pergunta.dto';
import { UpdatePerguntaDto } from './dto/update-pergunta.dto';
import { Usuario } from '../usuario/entidades/usuario.entity';
import { Formulario } from '../formulario/entidades/formulario.entity';

@Injectable()
export class PerguntaService {
  constructor(
    @InjectRepository(Pergunta)
    private perguntaRepository: Repository<Pergunta>,
    @InjectRepository(Formulario)
    private formularioRepository: Repository<Formulario>,
  ) {}

  /**
   * Cria um nova pergunta no sistema.
   * 
   * @param {CreatePerguntaDto} createPerguntaDto - Dados para criação da pergunta.
   * @param {Usuario} [criadoPor] - Usuário que está criando a nova pergunta.
   * @returns {Promise<Pergunta>} Retorna os dados da pergunta.
   */
  async create(createPerguntaDto: CreatePerguntaDto, criadoPor: Usuario) {
    const formulario = await this.formularioRepository.findOne({
      where: { id: createPerguntaDto.formularioId },
    });

    if (!formulario) {
      throw new NotFoundException('Formulário não encontrado');
    }

    const pergunta = this.perguntaRepository.create({
      ...createPerguntaDto,
      formulario,
      criadoPor,
    });

    return this.perguntaRepository.save(pergunta);
  }

  async createMany(createPerguntaDto: CreatePerguntaDto[], criadoPor: Usuario, formularioId: string) {
    const formulario = await this.formularioRepository.findOne({
      where: { id: formularioId },
    });

    if (!formulario) {
      throw new NotFoundException('Formulário não encontrado');
    }

    const novasPerguntas: Pergunta[] = [];

    for await (const pergunta of createPerguntaDto) {
      const novaPergunta = await this.perguntaRepository.create({
        ...pergunta,
        formulario,
        criadoPor,
      });
      novasPerguntas.push(novaPergunta);
    }

    return this.perguntaRepository.save(novasPerguntas);
  }

  /**
   * Retorna todas as perguntas do sistema.
   * 
   * @returns {Promise<Pergunta[]>} Retorna uma lista de todas as perguntas.
   */
  findAll() {
    return this.perguntaRepository.find({
      select: {
        id: true,
        etapa: true,
        label: true,
        tipo: true,
        opcoes: true,
        formulario: {
          id: true,
          nome: true,
        },
        criadoPor: {
          id: true,
          nome: true,
        },
      },
      relations: ['formulario', 'criadoPor'],
    });
  }

  /**
   * Retorna uma pergunta pelo seu ID.
   * 
   * @param {string} id - ID da pergunta.
   * @returns {Promise<Pergunta>} Retorna os dados da pergunta.
   */
  async findOne(id: string) {
    const pergunta = await this.perguntaRepository.findOne({
      where: { id },
      select: {
        id: true,
        etapa: true,
        label: true,
        tipo: true,
        opcoes: true,
        formulario: {
          id: true,
          nome: true,
        },
        criadoPor: {
          id: true,
          nome: true,
        },
      },
      relations: ['formulario', 'criadoPor'],
    });

    if (!pergunta) {
      throw new NotFoundException('Pergunta não encontrada');
    }

    return pergunta;
  }

  /**
   * Retorna todas as perguntas de um formulário.
   * 
   * @param {string} formularioId - ID do formulário.
   * @returns {Promise<Pergunta[]>} Retorna uma lista de todas as perguntas do formulário.
   */
  async findAllPerguntasByFormularioIdOrRota(formularioId: string) {
    return this.perguntaRepository.find({
      where: [
        { formularioId },
      ],
      select: {
        id: true,
        etapa: true,
        label: true,
        tipo: true,
        opcoes: true,
        gabarito: false,
      },
      order: {
        etapa: 'ASC',
      },
    });
  }

  async findByFormularioId(formularioId: string) {
    return this.perguntaRepository.find({
      where: { formularioId },
      select: ['id', 'gabarito'], // Otimizando para trazer só os campos necessários
    });
  }

  /**
   * Atualiza uma pergunta no sistema.
   * 
   * @param {string} id - ID da pergunta.
   * @param {UpdatePerguntaDto} updatePerguntaDto - Dados para atualização da pergunta.
   * @param {Usuario} atualizadoPor - Usuário que está atualizando a pergunta.
   * @returns {Promise<Pergunta>} Retorna os dados da pergunta atualizada.
   * @throws {NotFoundException} Se a pergunta não for encontrada.
   */
  async update(id: string, updatePerguntaDto: UpdatePerguntaDto, atualizadoPor: Usuario) {
    const pergunta = await this.perguntaRepository.findOne({ where: { id } });
    if (!pergunta) {
      throw new NotFoundException('Pergunta não encontrada');
    }

    await this.perguntaRepository.save({
      ...pergunta,
      ...updatePerguntaDto,
      atualizadoPor,
    });

    return this.findOne(id);
  }

  /**
   * Remove uma pergunta do sistema.
   * 
   * @param {string} id - ID da pergunta.
   * @param {Usuario} deletadoPor - Usuário que está deletando a pergunta.
   * @returns {Promise<{ id: string }>} Retorna o ID da pergunta deletada.
   * @throws {NotFoundException} Se a pergunta não for encontrada.
   */
  async remove(id: string, deletadoPor: Usuario) {
    const pergunta = await this.perguntaRepository.findOne({
      where: { id },
    });

    if (!pergunta) {
      throw new NotFoundException('Pergunta não encontrada');
    }

    await this.perguntaRepository.save({
      ...pergunta,
      deletadoPor,
    });

    await this.perguntaRepository.softDelete(id);

    return { id };
  }
}
