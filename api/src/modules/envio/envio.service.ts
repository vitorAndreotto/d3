import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Envio } from './entidades/envio.entity';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { Usuario } from '../usuario/entidades/usuario.entity';
import { CreateEnvioWithRespostasDto } from './dto/create-envio-respostas.dto';
import { RespostaService } from '../resposta/resposta.service';
import { FormularioService } from '../formulario/formulario.service';

@Injectable()
export class EnvioService {
  constructor(
    @InjectRepository(Envio)
    private envioRepository: Repository<Envio>,
    private readonly formularioService: FormularioService,
    private readonly respostaService: RespostaService,
  ) {}

  async create(createEnvioDto: CreateEnvioDto) {
    const formulario = await this.formularioService.findOne(createEnvioDto.formularioId);

    if (!formulario) {
      throw new NotFoundException('Formulário não encontrado');
    }

    const envio = await this.envioRepository.create({
      ...createEnvioDto,
      formulario,
    });

    return this.envioRepository.save(envio);
  }

  async createWithRespostas(createEnvioDto: CreateEnvioWithRespostasDto) {
    const formulario = await this.formularioService.findOne(createEnvioDto.formularioId);

    if (!formulario) {
      throw new NotFoundException('Formulário não encontrado');
    }

    const novoEnvio = await this.envioRepository.create({
      ...createEnvioDto,
      formulario,
    });

    const respostas = await Promise.all(createEnvioDto.respostas.map((resposta) => {
      return this.respostaService.create({
        ...resposta,
        envioId: novoEnvio.id,
      });
    }));

    const novoEnvioWithRespostas = {
      ...novoEnvio,
      respostas
    }

    return novoEnvioWithRespostas;
  }

  findAll() {
    return this.envioRepository.find({
      select: {
        id: true,
        formulario: {
          id: true,
          nome: true,
        },
        criadoEm: true,
      },
      relations: ['formulario'],
    });
  }

  async findOne(id: string) {
    const envio = await this.envioRepository.findOne({
      where: { id },
      select: {
        id: true,
        formulario: {
          id: true,
          nome: true,
        },
        criadoEm: true,
      },
      relations: ['formulario'],
    });

    if (!envio) {
      throw new NotFoundException('Envio não encontrado');
    }

    return envio;
  }

  async remove(id: string, deletadoPor: Usuario) {
    const envio = await this.envioRepository.findOne({
      where: { id },
    });

    if (!envio) {
      throw new NotFoundException('Envio não encontrado');
    }

    await this.envioRepository.save({
      ...envio,
      deletadoPor,
    });

    await this.envioRepository.softDelete(id);

    return { id };
  }
}
