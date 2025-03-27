import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resposta } from './entidades/resposta.entity';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { Usuario } from '../usuario/entidades/usuario.entity';
import { Envio } from '../envio/entidades/envio.entity';
import { Pergunta } from '../pergunta/entidades/pergunta.entity';

@Injectable()
export class RespostaService {
  constructor(
    @InjectRepository(Resposta)
    private respostaRepository: Repository<Resposta>,
    @InjectRepository(Envio)
    private envioRepository: Repository<Envio>,
    @InjectRepository(Pergunta)
    private perguntaRepository: Repository<Pergunta>,
  ) {}

  async create(createRespostaDto: CreateRespostaDto) {
    console.log("createRespostaDto", createRespostaDto);
    const envio = await this.envioRepository.findOne({
      where: { id: createRespostaDto.envioId },
    });

    if (!envio) {
      throw new NotFoundException('Envio não encontrado');
    }

    const pergunta = await this.perguntaRepository.findOne({
      where: { id: createRespostaDto.perguntaId },
    });

    if (!pergunta) {
      throw new NotFoundException('Pergunta não encontrada');
    }

    const resposta = this.respostaRepository.create(createRespostaDto);

    return this.respostaRepository.save(resposta);
  }

  async createMany(respostas: CreateRespostaDto[]) {
    const envio = await this.envioRepository.findOne({
      where: { id: respostas[0].envioId },
    });

    console.log("respostas", respostas);

    if (!envio) {
      throw new NotFoundException('Envio não encontrado');
    }

    const novasRespostas: Resposta[] = [];

    for await (const resposta of respostas) {
      const novaResposta = await this.respostaRepository.create({
        ...resposta,
        envio,
      });
      novasRespostas.push(novaResposta);
    }

    return this.respostaRepository.save(novasRespostas);
  }

  findAll() {
    return this.respostaRepository.find({
      select: {
        id: true,
        valor: true,
        status: true,
        envio: {
          id: true,
          nome: true,
          email: true,
        },
        pergunta: {
          id: true,
          label: true,
          tipo: true,
        },
      },
      relations: ['envio', 'pergunta'],
    });
  }

  async findOne(id: string) {
    const resposta = await this.respostaRepository.findOne({
      where: { id },
      select: {
        id: true,
        valor: true,
        status: true,
        envio: {
          id: true,
          nome: true,
          email: true,
        },
        pergunta: {
          id: true,
          label: true,
          tipo: true,
        },
      },
      relations: ['envio', 'pergunta'],
    });

    if (!resposta) {
      throw new NotFoundException('Resposta não encontrada');
    }

    return resposta;
  }

  async remove(id: string, deletadoPor: Usuario) {
    const resposta = await this.respostaRepository.findOne({
      where: { id },
    });

    if (!resposta) {
      throw new NotFoundException('Resposta não encontrada');
    }

    await this.respostaRepository.save({
      ...resposta,
      deletadoPor,
    });

    await this.respostaRepository.softDelete(id);

    return { id };
  }
}
