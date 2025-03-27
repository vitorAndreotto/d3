<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# API NestJS

Backend da aplicação desenvolvido com NestJS, TypeScript e MySQL.

## Estrutura de Diretórios

```
.
├── src/                      # Código fonte
│   ├── config/              # Configurações (TypeORM, etc)
│   ├── middleware/          # Middlewares da aplicação
│   ├── modules/             # Módulos da aplicação
│   │   ├── auth/           # Autenticação e autorização
│   │   ├── envio/          # Módulo de envio de dados
│   │   └── formulario/     # Módulo de formulários
│   └── main.ts             # Ponto de entrada da aplicação
├── test/                    # Testes automatizados
├── dist/                    # Código compilado
├── .env.development         # Variáveis de ambiente - desenvolvimento
├── .env.example            # Exemplo de variáveis de ambiente
├── Dockerfile              # Configuração do container
├── nest-cli.json          # Configuração do NestJS
├── package.json           # Dependências e scripts
└── tsconfig.json         # Configuração do TypeScript
```

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev     # Inicia em modo desenvolvimento
npm run start:debug   # Inicia em modo debug
npm run start:prod    # Inicia em modo produção

# Build
npm run build        # Compila o projeto
npm run format       # Formata o código
npm run lint         # Executa o linter

# Testes
npm run test         # Executa testes unitários
npm run test:watch   # Executa testes em modo watch
npm run test:cov     # Relatório de cobertura de testes
npm run test:debug   # Depuração de testes
npm run test:e2e     # Testes end-to-end
```

## Módulos Principais

### Auth
- Autenticação JWT
- Proteção de rotas
- Gerenciamento de sessão

### Envio
- Processamento de envios
- Validação de dados
- Armazenamento de respostas

### Formulário
- CRUD de formulários
- Validação de campos
- Gerenciamento de perguntas

## Configuração

O projeto utiliza variáveis de ambiente para configuração. Copie o arquivo `.env.example` para `.env.development` e ajuste as variáveis conforme necessário:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=nome_do_banco
```

## Docker

O projeto inclui um Dockerfile para containerização. Para construir a imagem:

```bash
docker build -t d3-api .
``` 
