#!/bin/sh

# Constrói as dependências primeiro usando Turbo
echo "Construindo dependências com Turbo..."
turbo run build --filter=web^... --no-daemon

# Então inicia o Next.js em modo dev
echo "Iniciando Next.js em modo dev..."
cd /app/apps/web && npm run dev -- --port 3002 --hostname 0.0.0.0
