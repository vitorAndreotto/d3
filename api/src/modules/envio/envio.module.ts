import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvioService } from './envio.service';
import { EnvioController } from './envio.controller';
import { Envio } from './entidades/envio.entity';
import { FormularioModule } from '../formulario/formulario.module';
import { RespostaModule } from '../resposta/resposta.module';
import { PerguntaModule } from '../pergunta/pergunta.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Envio]), 
    FormularioModule,
    RespostaModule,
    PerguntaModule,
  ],
  controllers: [EnvioController],
  providers: [EnvioService],
  exports: [EnvioService],
})
export class EnvioModule {}
