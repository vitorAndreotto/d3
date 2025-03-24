import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put, NotFoundException } from '@nestjs/common';
import { FormularioService } from './formulario.service';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PerguntaService } from '../pergunta/pergunta.service';
import { Pergunta } from '../pergunta/entidades/pergunta.entity';
import { CreateFormularioPerguntasDto } from './dto/create-formulario-perguntas.dto';

@Controller('formulario')
export class FormularioController {
  constructor(private readonly formularioService: FormularioService, private readonly perguntaService: PerguntaService) {}

  //TODO: Implementar limpeza do objeto retornado para remover informações de auditoria interna
  //TODO: Implementar validação de rota duplicada
  @UseGuards(JwtAuthGuard)
  @Post("/")
  create(@Body() createFormularioDto: CreateFormularioDto, @Request() req) {
    return this.formularioService.create(createFormularioDto, req.user);
  }

  //TODO: Implementar validação de rota duplicada
  //TODO: Implementar validação de rota duplicada, ignorando o id do formulário que esta sendo atualizado e gabaritos
  @UseGuards(JwtAuthGuard)
  @Post("/perguntas")
  async createWithPerguntas(@Body() createFormularioWithPerguntasDto: CreateFormularioPerguntasDto, @Request() req) {
    return this.formularioService.createWithPerguntas(createFormularioWithPerguntasDto, req.user);
  }

  @Get()
  findAll() {
    return this.formularioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formularioService.findOne(id);
  }

  @Get('rota/:device/:rota')
  findOneByRota(@Param('rota') rota: string, @Param('device') device: string) {
    switch (device) {
      case 'web':
        return this.formularioService.findOneByRotaAndWeb(rota);
      case 'mobile':
        return this.formularioService.findOneByRotaAndMobile(rota);
      case 'desktop':
        return this.formularioService.findOneByRotaAndDesktop(rota);
      default:
        throw new NotFoundException('Device inválido');
    }
  }

  @Get('etapas/:id')
  async findAllEtapas(@Param('id') id: string) {
    const perguntas =  await this.perguntaService.findAllPerguntasByFormularioId(id);

    if (!perguntas) {
      throw new NotFoundException('Perguntas não encontradas');
    }

    const etapas: { etapa: number; perguntas: Pergunta[] }[] = [];

    perguntas.forEach((p) => {
      let etapa = etapas.find(e => e.etapa === p.etapa);
  
      if (!etapa) {
        etapa = { etapa: p.etapa, perguntas: [] };
        etapas.push(etapa);
      }
  
      etapa.perguntas.push(p);
    });

    return etapas;
  }

  //TODO: Implementar limpeza do objeto retornado para remover informações de auditoria interna
  //TODO: Implementar validação de rota duplicada, ignorando o id do formulário que esta sendo atualizado
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormularioDto: UpdateFormularioDto,
    @Request() req,
  ) {
    return this.formularioService.update(id, updateFormularioDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.formularioService.remove(id, req.user);
  }
}
