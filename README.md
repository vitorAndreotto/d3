# D3 - Visualização de Dados com D3.js e NestJS

Este projeto é uma aplicação fullstack que demonstra visualizações de dados interativas usando D3.js no frontend, integrada com uma API NestJS e banco de dados MySQL no backend.

## Visão Geral

O projeto é dividido em três componentes principais:

1. **Frontend (D3.js)**
   - Visualizações de dados interativas
   - Interface moderna e responsiva
   - Gráficos e charts dinâmicos
   - Integração com a API para dados em tempo real

2. **Backend (NestJS)**
   - API RESTful
   - Processamento e transformação de dados
   - Integração com banco de dados
   - Autenticação e autorização

3. **Banco de Dados (MySQL)**
   - Armazenamento persistente de dados
   - Estrutura otimizada para consultas
   - Backups automáticos

## Estrutura do Projeto

```
.
├── api/                # Backend em NestJS
├── web/               # Frontend com D3.js
├── mysql/             # Configurações do banco de dados
├── docker-compose.yml # Configuração dos containers
└── .gitignore        # Arquivos ignorados pelo git
```

## Requisitos

- Docker
- Docker Compose
- Node.js 18+ (para desenvolvimento local)

## Configuração e Execução

1. Clone o repositório
2. Na raiz do projeto, execute:

```bash
docker-compose up -d
```

Isso irá iniciar:
- Frontend na porta 80
- API NestJS na porta 3000
- MySQL na porta 3306

### URLs do Projeto

- Frontend: `http://localhost`
- API: `http://localhost:3000`
- Swagger (Documentação API): `http://localhost:3000/api-docs`

### Credenciais do Banco de Dados

- Database: d3_db
- Usuário: admin
- Senha: xK9#mP2$vL5nQ8@jR
- Porta: 3306

## Desenvolvimento

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend (API)

```bash
cd api
npm install
npm run start:dev
```

### Scripts Disponíveis

#### Frontend
- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera build de produção
- `npm run test`: Executa testes

#### Backend
- Migrations:
  ```bash
  npm run migration:generate  # Gerar migration
  npm run migration:run      # Executar migrations
  npm run migration:revert   # Reverter última migration
  ```

- Testes:
  ```bash
  npm run test       # Testes unitários
  npm run test:e2e   # Testes e2e
  npm run test:cov   # Cobertura de testes
  ```

## Funcionalidades

- Visualizações de dados interativas com D3.js
- Gráficos em tempo real
- Filtros e controles dinâmicos
- API RESTful documentada
- Persistência de dados
- Autenticação e autorização
- Logs e monitoramento

## Observações

- Todos os serviços são containerizados com Docker
- O banco de dados possui persistência através de volumes Docker
- A API aguarda a disponibilidade do MySQL antes de iniciar
- Configurações de ambiente são gerenciadas via Docker Compose
- Frontend com hot-reload em desenvolvimento
- Documentação da API disponível via Swagger
