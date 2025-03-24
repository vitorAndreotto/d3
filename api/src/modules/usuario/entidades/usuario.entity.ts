import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  nome: string;

  @Column({ length: 50, unique: true })
  login: string;

  @Column({ length: 60, select: false })
  senha: string;

  @CreateDateColumn({ name: 'criado_em', select: false })
  criadoEm: Date;

  @Column({ name: 'criado_por', nullable: true, select: false })
  criadoPorId: string;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'criado_por' })
  criadoPor: Usuario;

  @UpdateDateColumn({ name: 'atualizado_em', nullable: true, select: true })
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
}
