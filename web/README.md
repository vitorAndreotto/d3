This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# Frontend D3.js

Frontend da aplicação desenvolvido com Next.js, TypeScript, D3.js e Tailwind CSS.

## Estrutura de Diretórios

```
.
├── src/                    # Código fonte
│   ├── app/               # Páginas e rotas
│   ├── components/        # Componentes reutilizáveis
│   ├── hooks/            # Hooks personalizados
│   ├── lib/              # Bibliotecas e utilitários
│   ├── styles/           # Estilos globais e temas
│   └── types/            # Definições de tipos TypeScript
├── public/               # Arquivos estáticos
├── .next/               # Build do Next.js
├── Dockerfile           # Configuração do container
├── next.config.js      # Configuração do Next.js
├── package.json        # Dependências e scripts
├── tailwind.config.ts  # Configuração do Tailwind
└── tsconfig.json       # Configuração do TypeScript
```

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev           # Inicia servidor de desenvolvimento
npm run build        # Gera build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa o linter
```

## Principais Funcionalidades

### Visualizações D3.js
- Gráficos interativos
- Dashboards dinâmicos
- Animações suaves
- Responsividade

### Componentes
- Layout responsivo
- Temas customizáveis
- Componentes reutilizáveis
- Integração com API

### Performance
- Server-side rendering
- Otimização de imagens
- Code splitting
- Cache eficiente

## Estilização

O projeto utiliza Tailwind CSS para estilização. Personalize os temas em:

```js
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#...',
        secondary: '#...',
      }
    }
  }
}
```

## Docker

O projeto inclui um Dockerfile para containerização. Para construir a imagem:

```bash
docker build -t d3-web .
```