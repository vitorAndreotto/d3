import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormularioService } from './formulario.service';
import { FormularioController } from './formulario.controller';
import { Formulario } from './entidades/formulario.entity';
import { PerguntaModule } from '../pergunta/pergunta.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Formulario]),
    PerguntaModule,
  ],
  controllers: [FormularioController],
  providers: [FormularioService],
  exports: [FormularioService, TypeOrmModule],
})
export class FormularioModule {}
