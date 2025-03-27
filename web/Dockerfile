FROM node:18-alpine

WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm install

# Copiar arquivos do projeto
COPY . .

# Expor porta
EXPOSE 3001

# Comando para rodar em desenvolvimento
CMD ["npm", "run", "dev"]
