import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUsuarioDto {
  @IsString({message: "Login precisa ser uma string"})
  @IsNotEmpty({message: "Login é obrigatório"})
  @MinLength(5, {message: "Login precisa ter pelo menos 5 caractere"})
  login: string;

  @IsString({message: "Senha precisa ser uma string"})
  @IsNotEmpty({message: "Senha é obrigatória"})
  @MinLength(7, {message: "Senha precisa ter pelo menos 7 caractere"})
  senha: string;
}
