import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class CreateEnvioDto {
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
}
