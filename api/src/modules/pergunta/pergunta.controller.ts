import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { PerguntaService } from './pergunta.service';
import { CreatePerguntaDto } from './dto/create-pergunta.dto';
import { UpdatePerguntaDto } from './dto/update-pergunta.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('pergunta')
export class PerguntaController {
  constructor(private readonly perguntaService: PerguntaService) {}

  //TODO: Implementar limpeza do objeto retornado para remover informações de auditoria interna
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPerguntaDto: CreatePerguntaDto, @Request() req) {
    return this.perguntaService.create(createPerguntaDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.perguntaService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perguntaService.findOne(id);
  }

  
  //TODO: Implementar limpeza do objeto retornado para remover informações de auditoria interna
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePerguntaDto: UpdatePerguntaDto,
    @Request() req,
  ) {
    return this.perguntaService.update(id, updatePerguntaDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.perguntaService.remove(id, req.user);
  }
}
