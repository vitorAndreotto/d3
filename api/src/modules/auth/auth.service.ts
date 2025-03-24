import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/modules/usuario/usuario.service';
import { LoginUsuarioDto } from 'src/modules/usuario/dto/login-usuario.dto';
import * as bcrypt from 'bcrypt';
import { logger } from '@utils/logger';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, senha: string): Promise<any> {
    try {
      const result = await this.usuarioService.login({ login, senha });
      return result;
    } catch (error) {
      logger.error('AuthService.validateUser', error.message);
      return null;
    }
  }

  async login(loginDto: LoginUsuarioDto) {
    const user = await this.validateUser(loginDto.login, loginDto.senha);
    
    if (!user) {
      logger.warn('AuthService.login', 'Credenciais inválidas');
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { login: user.login, sub: user.id };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        login: user.login,
        nome: user.nome,
      },
    };
  }
}
