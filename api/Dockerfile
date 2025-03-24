# Build stage
FROM node:20

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copiar apenas arquivos necessários para instalação de dependências
COPY package*.json ./

# Instalar dependências com cache eficiente
RUN npm ci

# Copiar o restante do código
COPY . .

# Definir variáveis de ambiente
ENV NODE_ENV=development

# Expor a porta da aplicação
EXPOSE 3333

# Comando para rodar o app
CMD npm run dev
