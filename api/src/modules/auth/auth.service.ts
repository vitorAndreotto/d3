import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/modules/usuario/usuario.service';
import { LoginUsuarioDto } from 'src/modules/usuario/dto/login-usuario.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { logger } from '@utils/logger';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginUsuarioDto) {
    try {
      const user = await this.usuarioService.login(loginDto);
      const payload = { login: user.login, sub: user.id };
      
      return {
        access_token: this.jwtService.sign(payload, {
          expiresIn: this.configService.get('JWT_EXPIRATION') || '1h',
        }),
        user: {
          id: user.id,
          login: user.login,
          nome: user.nome,
        },
      };
    } catch (error) {
      logger.warn('AuthService.login', 'Credenciais inválidas');
      throw new UnauthorizedException('Credenciais inválidas');
    }
  }
}
