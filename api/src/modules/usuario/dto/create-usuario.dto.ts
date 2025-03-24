import { IsString, Length, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString({message: "Nome precisa ser uma string"})
  @IsNotEmpty({message: "Nome é obrigatório"})
  @MinLength(7, {message: "Nome precisa ter pelo menos 7 caractere"})
  nome: string;

  @IsString({message: "Login precisa ser uma string"})
  @IsNotEmpty({message: "Login é obrigatório"})
  @MinLength(5, {message: "Login precisa ter pelo menos 5 caractere"})
  login: string;

  @IsString({message: "Senha precisa ser uma string"})
  @MinLength(7, {message: "Senha precisa ter pelo menos 7 caractere"})
  senha: string;
}
