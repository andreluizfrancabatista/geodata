# 📁 Estrutura Completa do Projeto

```
planejador-semeadura/
├── 📄 README.md
├── 📄 docker-compose.yml
├── 📄 create_data_files.sh
├── 📄 deployment-instructions.md
│
├── 📂 backend/
│   ├── 📄 package.json
│   ├── 📄 server.js
│   ├── 📄 Dockerfile
│   └── 📂 data/
│       ├── 📄 talhoes.csv
│       ├── 📄 culturas.csv
│       └── 📄 enso.csv
│
├── 📂 frontend/
│   ├── 📄 package.json
│   ├── 📄 vite.config.js
│   ├── 📄 tailwind.config.js
│   ├── 📄 postcss.config.js
│   ├── 📄 index.html
│   ├── 📄 Dockerfile
│   ├── 📄 nginx.conf
│   └── 📂 src/
│       ├── 📄 main.jsx
│       ├── 📄 App.jsx
│       ├── 📄 index.css
│       ├── 📂 components/
│       │   ├── 📄 Layout.jsx
│       │   └── 📄 BoxPlot.jsx
│       ├── 📂 pages/
│       │   ├── 📄 Planejamento.jsx
│       │   ├── 📄 Cadastro.jsx
│       │   └── 📄 Disclaimer.jsx
│       └── 📂 services/
│           └── 📄 api.js
│
└── 📂 data/ (compartilhado)
    ├── 📄 talhoes.csv
    ├── 📄 culturas.csv
    └── 📄 enso.csv
```

## 🎯 Resumo dos Componentes

### Backend (Node.js + Express)
- **server.js**: Servidor principal com todas as rotas API
- **Dockerfile**: Container para o backend
- **data/**: Arquivos CSV para persistência

### Frontend (React + Vite)
- **Layout.jsx**: Layout principal com navegação
- **Planejamento.jsx**: Página principal com inputs/outputs
- **Cadastro.jsx**: Formulários para talhões e culturas
- **Disclaimer.jsx**: Página de avisos e limitações
- **BoxPlot.jsx**: Componente customizado para visualização
- **api.js**: Configuração do cliente HTTP

### Configuração
- **docker-compose.yml**: Orquestração dos containers
- **nginx.conf**: Proxy reverso e servidor estático
- **tailwind.config.js**: Cores customizadas do agronegócio

### Deploy
- **deployment-instructions.md**: Guia completo de deploy
- **create_data_files.sh**: Script para inicialização de dados

## 🚀 Como Usar

### 1. Desenvolvimento Local
```bash
# Clone o projeto
git clone <repository-url>
cd planejador-semeadura

# Execute com Docker
docker-compose up --build
```

### 2. Deploy em Produção
```bash
# No VPS
cd /opt
git clone <repository-url> planejador-semeadura
cd planejador-semeadura
docker-compose up --build -d
```

### 3. Acessar a Aplicação
- **Frontend**: http://localhost (produção) ou http://localhost:5173 (dev)
- **Backend API**: http://localhost:3001/api

## 📊 Funcionalidades Implementadas

✅ **Planejamento**
- Seleção de talhão, cultura, ciclo e fenômeno climático
- Gráfico de barras ENSO (Chart.js)
- BoxPlot de produtividade customizado (Canvas)
- Dados de produtividade simulados e responsivos aos inputs

✅ **Cadastros**
- Formulário de talhões (latitude, longitude, tipo de solo)
- Formulário de culturas (nome)
- Listagem e visualização dos dados cadastrados
- Persistência em arquivos CSV

✅ **Interface**
- Design responsivo (mobile + desktop)
- Cores do agronegócio (verde, marrom, amarelo)
- Navegação por tabs
- Notificações de sucesso/erro
- Layout limpo e intuitivo

✅ **Backend**
- API REST completa
- Inicialização automática de dados
- Simulação de produtividade baseada em parâmetros
- Tratamento de erros
- CORS configurado

✅ **Deploy**
- Containerização com Docker
- Docker Compose para orquestração
- Nginx como proxy reverso
- Configuração para VPS
- Scripts de manutenção

## 🔧 Extensibilidade

A arquitetura foi projetada para fácil extensão:

### Adicionar Nova Página
1. Criar componente em `frontend/src/pages/`
2. Adicionar rota em `App.jsx`
3. Incluir item de navegação em `Layout.jsx`

### Adicionar Nova API
1. Adicionar rota em `backend/server.js`
2. Criar função no serviço `frontend/src/services/api.js`

### Adicionar Novo Tipo de Gráfico
1. Criar componente em `frontend/src/components/`
2. Importar e usar na página desejada

### Migrar de CSV para Banco de Dados
1. Substituir funções `readCSV`/`writeCSV` por ORM
2. Atualizar `docker-compose.yml` com banco
3. Manter mesma interface da API

Este MVP está pronto para demonstração e pode ser facilmente expandido para uma aplicação completa de produção! 🌾✨