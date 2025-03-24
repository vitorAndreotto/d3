import { IsString, IsEnum } from 'class-validator';
import { StatusResposta } from '../entidades/resposta.entity';

export class CreateRespostaDto {
  @IsString()
  envioId: string;

  @IsString()
  perguntaId: string;

  @IsString()
  valor: string;

  @IsEnum(StatusResposta)
  status: StatusResposta;
}
