# ----------------------------------------
# Development stage
# ----------------------------------------
FROM node:18.19-alpine

# Diretório principal da aplicação
WORKDIR /app

# Melhora compatibilidade com libs nativas
RUN apk add --no-cache libc6-compat python3 make g++

# Instala Turbo e TypeScript globalmente
RUN npm install -g turbo typescript

# Variáveis de ambiente para desenvolvimento
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3002
ENV HOSTNAME=0.0.0.0

# Expondo a porta do web
EXPOSE 3002

# Comando para desenvolvimento com hot reloading
CMD cd /app && \
    echo "Instalando dependências do projeto..." && \
    npm install && \
    echo "Instalando dependências do web app..." && \
    cd /app/apps/web && \
    npm install && \
    cd /app && \
    echo "Compilando pacotes compartilhados..." && \
    npx turbo run build --filter=@front/ui --filter=@repo/assets && \
    echo "Iniciando o servidor de desenvolvimento..." && \
    cd /app/apps/web && \
    npm run dev