import { CreateRespostaSimplesDto } from '../../resposta/dto/create-resposta-simples.dto';
import { IsString, IsEmail, IsOptional, IsArray } from 'class-validator';
import { CreateEnvioDto } from './create-envio.dto';

export class CreateEnvioWithRespostasDto extends CreateEnvioDto {
  @IsString()
  formularioId: string;

  @IsString()
  @IsOptional()
  nome: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsArray()
  respostas: CreateRespostaSimplesDto[];
}
