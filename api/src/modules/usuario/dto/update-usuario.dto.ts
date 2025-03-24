import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUsuarioDto {
  @IsString({message: "Nome precisa ser uma string"})
  @IsNotEmpty({message: "Nome é obrigatório"})
  @MinLength(7, {message: "Nome precisa ter pelo menos 7 caractere"})
  nome?: string;

  @IsString({message: "Senha precisa ser uma string"})
  @MinLength(7, {message: "Senha precisa ter pelo menos 7 caractere"})
  senha?: string;
}
