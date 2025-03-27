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

  @Get('rota/:rota')
  findOneByRota(@Param('rota') rota: string) {
    return this.formularioService.findOneByRota(rota);
  }

  @Get('etapas/:rota')
  async findAllEtapas(@Param('rota') rota: string) {
    const formulario = await this.formularioService.findOneByRota(rota);
    const perguntas = await this.perguntaService.findAllPerguntasByFormularioIdOrRota(formulario.id);

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

    return { ...formulario, etapas };
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
