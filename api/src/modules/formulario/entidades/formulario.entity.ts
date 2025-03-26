import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne,
  OneToMany,
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn,
  JoinColumn
} from 'typeorm';
import { Usuario } from '../../usuario/entidades/usuario.entity';
import { Resposta } from '../../resposta/entidades/resposta.entity';
import { Pergunta } from '../../pergunta/entidades/pergunta.entity';

@Entity('formulario')
export class Formulario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  nome: string;

  @Column({ length: 50, unique: true })
  rota: string;

  @Column({ length: 255 })
  titulo: string;

  @Column({ length: 255 })
  descricao: string;

  @Column({ length: 255, name: 'titulo_final' })
  tituloFinal: string;

  @Column({ length: 255, name: 'descricao_final' })
  descricaoFinal: string;

  @Column({ length: 255, name: 'imagem_fundo', default: 'default' })
  imagemFundo: string;

  @Column({ length: 7, name: 'cor_fundo', default: '#000000' })
  corFundo: string;

  @Column({ length: 7, name: 'cor_principal', default: '#FFFF00' })
  corPrincipal: string;

  @Column({ length: 7, name: 'cor_texto', default: '#FFFFFF' })
  corTexto: string;

  @Column({ length: 255, name: 'tipo', select: true})
  tipo: string;  

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

  @OneToMany(() => Resposta, resposta => resposta.formulario)
  respostas: Resposta[];

  @OneToMany(() => Pergunta, (pergunta) => pergunta.formulario)
  perguntas: Pergunta[];
}
