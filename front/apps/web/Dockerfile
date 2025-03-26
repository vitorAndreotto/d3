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

# Script de inicialização
COPY ./apps/web/docker-dev.sh /docker-dev.sh
RUN chmod +x /docker-dev.sh

# Comando para desenvolvimento com hot reloading
CMD ["/docker-dev.sh"]