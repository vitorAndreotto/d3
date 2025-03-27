import { IsString, IsEnum } from 'class-validator';

export class CreateRespostaSimplesDto {
  @IsString()
  perguntaId: string;

  @IsString()
  valor: string;
}
