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

@Entity('envio')
export class Envio {
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

  @Column({ name: 'formulario_id' })
  formularioId: string;

  @ManyToOne(() => Formulario, { nullable: false })
  @JoinColumn({ name: 'formulario_id' })
  formulario: Formulario;

  @Column({ length: 255, nullable: true })
  nome: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ name: 'resultado_acerto', type: 'decimal', precision: 5, scale: 2 })
  resultadoAcerto: number;

  @Column({ name: 'resultado_vazio', type: 'decimal', precision: 5, scale: 2 })
  resultadoVazio: number;

  @Column({ name: 'resultado_erros', type: 'decimal', precision: 5, scale: 2 })
  resultadoErros: number;
}
