import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerguntaService } from './pergunta.service';
import { PerguntaController } from './pergunta.controller';
import { Pergunta } from './entidades/pergunta.entity';
import { Formulario } from '../formulario/entidades/formulario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pergunta, Formulario])],
  controllers: [PerguntaController],
  providers: [PerguntaService],
  exports: [PerguntaService],
})
export class PerguntaModule {}
