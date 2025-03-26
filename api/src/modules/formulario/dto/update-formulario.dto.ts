import { IsString, Length, IsBoolean, IsOptional } from 'class-validator';

export class UpdateFormularioDto {
  @IsString({message: "Nome precisa ser uma string"})
  @Length(1, 50, {message: "Nome precisa ter entre 1 e 50 caracteres"})
  nome: string;

  @IsString({message: "Rota precisa ser uma string"})
  @Length(1, 50, {message: "Rota precisa ter entre 1 e 50 caracteres"})
  rota: string;

  @IsString({message: "Título precisa ser uma string"})
  @Length(1, 255, {message: "Título precisa ter entre 1 e 255 caracteres"})
  titulo: string;

  @IsString({message: "Descrição precisa ser uma string"})
  @Length(1, 255, {message: "Descrição precisa ter entre 1 e 255 caracteres"})
  descricao: string;

  @IsString({message: "Título final precisa ser uma string"})
  @Length(1, 255, {message: "Título final precisa ter entre 1 e 255 caracteres"})
  tituloFinal: string;

  @IsString({message: "Descrição final precisa ser uma string"})
  @Length(1, 255, {message: "Descrição final precisa ter entre 1 e 255 caracteres"})
  descricaoFinal: string;

  @IsString({message: "Tipo precisa ser uma string"})
  @Length(1, 255, {message: "Tipo precisa ter entre 1 e 255 caracteres"})
  tipo?: string;

  @IsString({message: "Imagem de fundo precisa ser uma string"})
  @Length(1, 255, {message: "Imagem de fundo precisa ter entre 1 e 255 caracteres"})
  @IsOptional()
  imagemFundo?: string;

  @IsString({message: "Cor de fundo precisa ser uma string"})
  @Length(1, 7, {message: "Cor de fundo precisa ter entre 1 e 7 caracteres"})
  @IsOptional()
  corFundo?: string;

  @IsString({message: "Cor principal precisa ser uma string"})
  @Length(1, 7, {message: "Cor principal precisa ter entre 1 e 7 caracteres"})
  @IsOptional()
  corPrincipal?: string;

  @IsString({message: "Cor de texto precisa ser uma string"})
  @Length(1, 7, {message: "Cor de texto precisa ter entre 1 e 7 caracteres"})
  @IsOptional()
  corTexto?: string;
}
