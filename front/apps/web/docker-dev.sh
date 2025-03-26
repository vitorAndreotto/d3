#!/bin/sh

# Garante que estamos no diretório correto
cd /app

# Instala as dependências se necessário
echo "Instalando dependências do projeto..."
npm install

# Instala as dependências do web app
echo "Instalando dependências do web app..."
cd /app/apps/web
npm install

cd /app

# Compila os pacotes compartilhados primeiro
echo "Compilando pacotes compartilhados..."
npx turbo run build --filter=@front/ui --filter=@repo/assets

# Inicia o servidor de desenvolvimento
echo "Iniciando o servidor de desenvolvimento..."
cd /app/apps/web
npm run dev
