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
import { Formulario } from '../../formulario/entidades/formulario.entity';

export enum TipoPergunta {
  SELECT = 'select',
  TEXTAREA = 'textarea',
  RADIO = 'radio'
}

@Entity('pergunta')
export class Pergunta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'criado_em', select: false })
  criadoEm: Date;

  @Column({ name: 'criado_por', nullable: true, select: false })
  criadoPorId: string;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'criado_por' })
  criadoPor: Usuario;

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

  @Column({ name: 'formulario_id' })
  formularioId: string;

  @ManyToOne(() => Formulario, { nullable: false })
  @JoinColumn({ name: 'formulario_id' })
  formulario: Formulario;

  @Column({ default: 1 })
  etapa: number;

  @Column({ length: 255 })
  label: string;

  @Column({ type: 'enum', enum: TipoPergunta })
  tipo: TipoPergunta;

  @Column({ type: 'json', nullable: true })
  opcoes: any;

  @Column({ type: 'json', nullable: true })
  gabarito: any;
}
