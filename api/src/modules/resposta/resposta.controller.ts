import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { RespostaService } from './resposta.service';
import { CreateRespostaDto } from './dto/create-resposta.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('respostas')
export class RespostaController {
  constructor(private readonly respostaService: RespostaService) {}

  @Post()
  create(@Body() createRespostaDto: CreateRespostaDto) {
    return this.respostaService.create(createRespostaDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.respostaService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.respostaService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.respostaService.remove(id, req.user);
  }
}
