import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entidades/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  /**
   * Cria um novo usuário no sistema.
   * 
   * @param {CreateUsuarioDto} createUsuarioDto - Dados para criação do usuário.
   * @param {Usuario} [criadoPor] - Usuário que está criando o novo usuário.
   * @returns {Promise<Omit<Usuario, 'senha'>>} Retorna os dados do usuário sem o campo de senha.
   * @throws {ConflictException} Se o login já estiver em uso.
   */
  async create(createUsuarioDto: CreateUsuarioDto, criadoPor?: Usuario) {
    const existingUser = await this.usuarioRepository.findOne({
      where: { login: createUsuarioDto.login },
      withDeleted: true,
    });

    if (existingUser) {
      throw new ConflictException('Login já está em uso');
    }

    const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, 10);

    const usuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      senha: hashedPassword,
      criadoPor,
    });

    const savedUser = await this.usuarioRepository.save(usuario);
    const { senha, ...result } = savedUser;

    return result;
  }

  /**
   * Realiza o login de um usuário.
   *
   * @param {LoginUsuarioDto} loginDto - Dados de login (login e senha).
   * @returns {Promise<Omit<Usuario, 'senha'>>} Retorna os dados do usuário sem o campo de senha.
   * @throws {UnauthorizedException} Se o login ou a senha forem inválidos.
   */
  async login(loginDto: LoginUsuarioDto) {    
    const usuario = await this.usuarioRepository.findOne({
      where: { login: loginDto.login },
      select: ['id', 'nome', 'login', 'senha'],
    });

    if (!usuario) {
      throw new UnauthorizedException('Login ou senha inválidos');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.senha, usuario.senha);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Login ou senha inválidos');
    }

    const { senha, ...result } = usuario;
    return result;
  }

  /**
   * Retorna todos os usuários.
   *
   * @returns {Promise<Usuario[]>} Array de usuários.
   */
  findAll() {
    return this.usuarioRepository.find({
      select: ['id', 'nome', 'login', 'criadoEm'],
    });
  }

  /**
   * Retorna um usuário pelo ID.
   *
   * @param {string} id - ID do usuário.
   * @returns {Promise<Omit<Usuario, 'senha'>>} Retorna os dados do usuário sem o campo de senha.
   * @throws {Error} Se o usuário não for encontrado.
   */
  async findOne(id: string) {
    const usuario = await this.usuarioRepository.findOne({ 
      where: { id },
      select: ['id', 'nome', 'login', 'criadoEm'],
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return usuario;
  }

  /**
   * Atualiza um usuário pelo ID.
   *
   * @param {string} id - ID do usuário.
   * @param {UpdateUsuarioDto} updateUsuarioDto - Dados para atualização do usuário.
   * @param {Usuario} atualizadoPor - Usuário que está realizando a atualização.
   * @returns {Promise<Omit<Usuario, 'senha'>>} Retorna os dados do usuário sem o campo de senha.
   * @throws {Error} Se o usuário não for encontrado.
   */
  async update(id: string, updateUsuarioDto: UpdateUsuarioDto, atualizadoPor: Usuario) {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (updateUsuarioDto.senha) {
      updateUsuarioDto.senha = await bcrypt.hash(updateUsuarioDto.senha, 10);
    }

    await this.usuarioRepository.save({
      ...usuario,
      ...updateUsuarioDto,
      atualizadoPor,
    });

    return this.findOne(id);
  }

  /**
   * Remove um usuário pelo ID.
   *
   * @param {string} id - ID do usuário.
   * @param {Usuario} deletadoPor - Usuário que está realizando a remoção.
   * @returns {Promise<{ id: string }>} Retorna o ID do usuário removido.
   * @throws {Error} Se o usuário não for encontrado.
   */
  async remove(id: string, deletadoPor: Usuario) {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.usuarioRepository.save({
      ...usuario,
      deletadoPor,
    });

    await this.usuarioRepository.softDelete(id);

    return { id };
  }
}
