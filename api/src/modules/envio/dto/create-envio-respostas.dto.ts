import { CreateRespostaDto } from '../../resposta/dto/create-resposta.dto';
import { IsString, IsEmail, IsOptional, IsNumber, IsArray } from 'class-validator';
import { CreateEnvioDto } from './create-envio.dto';

export class CreateEnvioWithRespostasDto extends CreateEnvioDto {
  @IsString()
  formularioId: string;

  @IsString()
  @IsOptional()
  nome?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNumber()
  resultadoAcerto: number;

  @IsNumber()
  resultadoVazio: number;

  @IsNumber()
  resultadoErros: number;

  @IsArray()
  respostas: CreateRespostaDto[];
}
