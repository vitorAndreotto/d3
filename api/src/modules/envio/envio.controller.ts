import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { EnvioService } from './envio.service';
import { CreateEnvioWithRespostasDto } from './dto/create-envio-respostas.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('envio')
export class EnvioController {
  constructor(private readonly envioService: EnvioService) {}

  @Post("/respostas")
  create(@Body() createEnvioWithRespostasDto: CreateEnvioWithRespostasDto) {
    return this.envioService.createWithRespostas(createEnvioWithRespostasDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.envioService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.envioService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.envioService.remove(id, req.user);
  }
}
