import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AuthModule } from './modules/auth/auth.module';
import { FormularioModule } from './modules/formulario/formulario.module';
import { PerguntaModule } from './modules/pergunta/pergunta.module';
import { EnvioModule } from './modules/envio/envio.module';
import { RespostaModule } from './modules/resposta/resposta.module';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { SqlInjectionMiddleware } from './middleware/sql-injection.middleware';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    UsuarioModule,
    AuthModule,
    FormularioModule,
    PerguntaModule,
    EnvioModule,
    RespostaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes('*');
    consumer
      .apply(SqlInjectionMiddleware)
      .forRoutes('*');
  }
}
