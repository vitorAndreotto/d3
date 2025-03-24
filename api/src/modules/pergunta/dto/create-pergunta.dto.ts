import { IsString, IsEnum, IsNumber, IsOptional, IsObject, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { TipoPergunta } from '../entidades/pergunta.entity';
import { OpcaoDto } from './opcoes.dto';
import { Type } from 'class-transformer';

export class CreatePerguntaDto {
  @IsString({message: "Formulário precisa ser uma string"})
  @IsNotEmpty({message: "Formulário é obrigatório"})
  formularioId: string;

  @IsNumber()
  @IsNotEmpty({message: "Etapa é obrigatória"})
  etapa: number;

  @IsString({message: "Label precisa ser uma string"})
  @IsNotEmpty({message: "Label é obrigatório"})
  label: string;

  @IsEnum(TipoPergunta)
  @IsNotEmpty({message: "Tipo de pergunta é obrigatório"})
  tipo: TipoPergunta;

  @IsArray({ message: 'Opções precisam ser um array' })
  @ValidateNested({ each: true })
  @Type(() => OpcaoDto)
  @IsOptional()
  opcoes?: OpcaoDto[];

  @IsArray({ message: 'Gabarito precisam ser um array' })
  @IsOptional()
  gabarito?: any[];
}
