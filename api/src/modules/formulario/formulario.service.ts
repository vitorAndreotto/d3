import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Formulario } from './entidades/formulario.entity';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
import { Usuario } from '../usuario/entidades/usuario.entity';
import { PerguntaService } from '../pergunta/pergunta.service';
import { CreateFormularioPerguntasDto } from './dto/create-formulario-perguntas.dto';

@Injectable()
export class FormularioService {
  constructor(
    @InjectRepository(Formulario)
    private formularioRepository: Repository<Formulario>,
    private readonly perguntaService: PerguntaService,
  ) {}

  /**
   * Cria um novo formulário no sistema.
   * 
   * @param {CreateFormularioDto} createFormularioDto - Dados para criação do formulário.
   * @param {Usuario} [criadoPor] - Usuário que está criando o novo formulário.
   * @returns {Promise<Formulario>} Retorna os dados do formulário.
   */
  async create(createFormularioDto: CreateFormularioDto, criadoPor: Usuario) {
    const formulario = this.formularioRepository.create({
      ...createFormularioDto,
      criadoPor,
    });

    return this.formularioRepository.save(formulario);
  }

   /**
   * Cria um novo formulário no sistema com perguntas.
   * 
   * @param {CreateFormularioPerguntasDto} createFormularioWithPerguntasDto - Dados para criação do formulário.
   * @param {Usuario} [criadoPor] - Usuário que está criando o novo formulário.
   * @returns {Promise<Formulario>} Retorna os dados do formulário.
   */
  async createWithPerguntas(createFormularioWithPerguntasDto: CreateFormularioPerguntasDto, criadoPor: Usuario) {
    const formulario = await this.create(createFormularioWithPerguntasDto, criadoPor);

    const perguntas = await this.perguntaService.createMany(createFormularioWithPerguntasDto.perguntas, criadoPor, formulario.id);

    const novoFormularioWithPerguntas = {
      ...formulario,
      perguntas
    }

    return novoFormularioWithPerguntas;
  }

  /**
   * Retorna todos os formulários do sistema.
   * 
   * @returns {Promise<Formulario[]>} Retorna uma lista de todos os formulários.
   */
  findAll() {
    return this.formularioRepository.find({
      select: {
        id: true,
        nome: true,
        rota: true,
        titulo: true,
        descricao: true,
        tituloFinal: true,
        descricaoFinal: true,
        imagemFundo: true,
        corFundo: true,
        corPrincipal: true,
        corTexto: true,
        tipo: true,
      },
    });
  }

  /**
   * Retorna um formulário específico do sistema.
   * 
   * @param {string} id - ID do formulário.
   * @returns {Promise<Formulario>} Retorna os dados do formulário.
   * @throws {NotFoundException} Se o formulário não for encontrado.
   */
  async findOne(id: string) {
    const formulario = await this.formularioRepository.findOne({
      where: { id },
      select: {
        id: true,
        nome: true,
        rota: true,
        titulo: true,
        descricao: true,
        tituloFinal: true,
        descricaoFinal: true,
        imagemFundo: true,
        corFundo: true,
        corPrincipal: true,
        corTexto: true,
        criadoPor: {
          id: true,
          nome: true,
        },
      },
      relations: ['criadoPor'],
    });

    if (!formulario) {
      throw new NotFoundException('Formulário não encontrado');
    }

    return formulario;
  }

  /**
   * Retorna um formulário específico do sistema.
   * 
   * @param {string} rota - Rota do formulário.
   * @returns {Promise<Formulario>} Retorna os dados do formulário.
   */
  async findOneByRota(rota: string) {
    const formulario = await this.formularioRepository.findOne({
      where: { rota },
    });

    return formulario;
  }

  /**
   * Atualiza um formulário no sistema.
   * 
   * @param {string} id - ID do formulário.
   * @param {UpdateFormularioDto} updateFormularioDto - Dados para atualização do formulário.
   * @param {Usuario} atualizadoPor - Usuário que está atualizando o formulário.
   * @returns {Promise<Formulario>} Retorna os dados do formulário atualizado.
   * @throws {NotFoundException} Se o formulário não for encontrado.
   */
  async update(id: string, updateFormularioDto: UpdateFormularioDto, atualizadoPor: Usuario) {
    const formulario = await this.formularioRepository.findOne({ where: { id } });
    if (!formulario) {
      throw new NotFoundException('Formulário não encontrado');
    }

    await this.formularioRepository.save({
      ...formulario,
      ...updateFormularioDto,
      atualizadoPor,
    });

    return this.findOne(id);
  }

  /**
   * Remove um formulário do sistema.
   * 
   * @param {string} id - ID do formulário.
   * @param {Usuario} deletadoPor - Usuário que está deletando o formulário.
   * @returns {Promise<{ id: string }>} Retorna o ID do formulário deletado.
   * @throws {NotFoundException} Se o formulário não for encontrado.
   */
  async remove(id: string, deletadoPor: Usuario) {
    const formulario = await this.formularioRepository.findOne({
      where: { id },
    });

    if (!formulario) {
      throw new NotFoundException('Formulário não encontrado');
    }

    await this.formularioRepository.save({
      ...formulario,
      deletadoPor,
    });

    await this.formularioRepository.softDelete(id);

    return { id };
  }
}
