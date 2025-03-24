import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespostaService } from './resposta.service';
import { RespostaController } from './resposta.controller';
import { Resposta } from './entidades/resposta.entity';
import { Envio } from '../envio/entidades/envio.entity';
import { Pergunta } from '../pergunta/entidades/pergunta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resposta, Envio, Pergunta])],
  controllers: [RespostaController],
  providers: [RespostaService],
  exports: [RespostaService],
})
export class RespostaModule {}
