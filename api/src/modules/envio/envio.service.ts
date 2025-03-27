import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Envio } from './entidades/envio.entity';
import { CreateEnvioDto } from './dto/create-envio.dto';
import { Usuario } from '../usuario/entidades/usuario.entity';
import { CreateEnvioWithRespostasDto } from './dto/create-envio-respostas.dto';
import { RespostaService } from '../resposta/resposta.service';
import { FormularioService } from '../formulario/formulario.service';
import { StatusResposta } from '../resposta/entidades/resposta.entity';
import { PerguntaService } from '../pergunta/pergunta.service';

@Injectable()
export class EnvioService {
  constructor(
    @InjectRepository(Envio)
    private envioRepository: Repository<Envio>,
    private readonly formularioService: FormularioService,
    private readonly respostaService: RespostaService,
    private readonly perguntaService: PerguntaService,
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

  private isJsonString(str: string) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  private async analisarRespostas(respostas: { perguntaId: string; valor: string }[], formularioId: string) {
    const perguntas = await this.perguntaService.findByFormularioId(formularioId);

    const resultados = {
      acertos: 0,
      erros: 0,
      vazios: 0,
      total: perguntas.length,
      statusPorResposta: [] as StatusResposta[],
    };
    
    const perguntasMap = new Map(perguntas.map(p => [p.id, p]));

    for (const resposta of respostas) {
      const pergunta = perguntasMap.get(resposta.perguntaId);
      
      if (!pergunta) {
        throw new NotFoundException(`Pergunta ${resposta.perguntaId} não encontrada no formulário ${formularioId}`);
      }

      let status: StatusResposta = StatusResposta.VAZIO;

      // Caso 1: Valor nulo ou vazio
      if (!resposta.valor || String(resposta.valor).trim() === '' || String(resposta.valor).trim() === '<p></p>') {
        status = StatusResposta.VAZIO;
        resultados.vazios++;
        resultados.statusPorResposta.push(status);
        continue;
      }

      // Caso 2: Tem gabarito
      if (pergunta.gabarito) {
        // Tenta converter para JSON
        if (this.isJsonString(pergunta.gabarito)) {
          try {
            const jsonGabarito = JSON.parse(pergunta.gabarito);
            console.log({jsonGabarito});
            // Se for array
            if (Array.isArray(jsonGabarito)) {
              status = jsonGabarito.includes(resposta.valor) 
                ? StatusResposta.ACERTO 
                : StatusResposta.ERRO;
            } else {
              status = resposta.valor == pergunta.gabarito 
              ? StatusResposta.ACERTO 
              : StatusResposta.ERRO;
            }
          } catch (e) {
            // Se falhou ao usar JSON, compara strings
            status = resposta.valor == pergunta.gabarito 
              ? StatusResposta.ACERTO 
              : StatusResposta.ERRO;
          }
        } else {
          // Não é JSON, compara strings diretamente
          status = resposta.valor == pergunta.gabarito 
            ? StatusResposta.ACERTO 
            : StatusResposta.ERRO;
        }
      } else {
        // Caso 3: Sem gabarito, considera acerto
        status = StatusResposta.ACERTO;
      }

      // Atualiza contadores
      if (status === StatusResposta.ACERTO) {
        resultados.acertos++;
      } else if (status === StatusResposta.ERRO) {
        resultados.erros++;
      }

      resultados.statusPorResposta.push(status);
    }

    return {
      resultadoAcerto: Number((resultados.acertos / resultados.total * 100).toFixed(2)),
      resultadoErros: Number((resultados.erros / resultados.total * 100).toFixed(2)),
      resultadoVazio: Number(((resultados.vazios ? resultados.vazios : resultados.total - (resultados.acertos + resultados.erros)) / resultados.total * 100).toFixed(2)),
      statusPorResposta: resultados.statusPorResposta,
    };
  }

  async createWithRespostas(createEnvioDto: CreateEnvioWithRespostasDto) {
    const formulario = await this.formularioService.findOne(createEnvioDto.formularioId);

    if (!formulario) {
      throw new NotFoundException('Formulário não encontrado');
    }

    // Analisa as respostas antes de salvar
    const analise = await this.analisarRespostas(createEnvioDto.respostas, formulario.id);

    const novoEnvio = await this.envioRepository.save({
      ...createEnvioDto,
      formularioId: formulario.id,
      resultadoAcerto: analise.resultadoAcerto,
      resultadoErros: analise.resultadoErros,
      resultadoVazio: analise.resultadoVazio,
    });

    // Cria as respostas usando os status já calculados
    await Promise.all(createEnvioDto.respostas.map(async (resposta, index) => {
      return this.respostaService.create({
        valor: String(resposta.valor).trim() === '<p></p>' ? null : resposta.valor,
        ...resposta,
        envioId: novoEnvio.id,
        status: analise.statusPorResposta[index],
      });
    }));

    return {
      resultados: {
        acertos: analise.resultadoAcerto,
        erros: analise.resultadoErros,
        vazios: analise.resultadoVazio,
      }
    };
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
