import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn,
  JoinColumn
} from 'typeorm';
import { Usuario } from '../../usuario/entidades/usuario.entity';
import { Envio } from '../../envio/entidades/envio.entity';
import { Pergunta } from '../../pergunta/entidades/pergunta.entity';
import { Formulario } from '../../formulario/entidades/formulario.entity';

export enum StatusResposta {
  ACERTO = 'acerto',
  ERRO = 'erro',
  VAZIO = 'vazio'
}

@Entity('resposta')
export class Resposta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'criado_em', select: false })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em', nullable: true, select: false })
  atualizadoEm: Date;

  @Column({ name: 'atualizado_por', nullable: true, select: false })
  atualizadoPorId: string;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'atualizado_por' })
  atualizadoPor: Usuario;

  @DeleteDateColumn({ name: 'deletado_em', select: false })
  deletadoEm: Date;

  @Column({ name: 'deletado_por', nullable: true, select: false })
  deletadoPorId: string;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'deletado_por' })
  deletadoPor: Usuario;

  @Column({ name: 'envio' })
  envioId: string;

  @ManyToOne(() => Envio, { nullable: false })
  @JoinColumn({ name: 'envio' })
  envio: Envio;

  @Column({ name: 'pergunta_id' })
  perguntaId: string;

  @ManyToOne(() => Pergunta, { nullable: false })
  @JoinColumn({ name: 'pergunta_id' })
  pergunta: Pergunta;

  @ManyToOne(() => Formulario, formulario => formulario.respostas)
  @JoinColumn({ name: 'formulario_id' })
  formulario: Formulario;

  @Column({ type: 'mediumtext', nullable: true })
  valor: string;

  @Column({ type: 'enum', enum: StatusResposta })
  status: StatusResposta;
}
