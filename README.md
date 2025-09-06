# 🌾 Planejador de Semeadura

MVP de uma aplicação web para planejamento de semeadura agrícola com visualizações de dados climáticos e produtividade.

## 📋 Funcionalidades

### 🎯 Planejamento
- **Inputs configuráveis**: Talhão, Cultura, Ciclo, Fenômeno climático
- **Gráfico ENSO**: Probabilidades de El Niño, La Niña e Neutro por estação
- **BoxPlot de Produtividade**: Visualização da produtividade potencial por período

### 📝 Cadastros
- **Talhões**: Latitude, longitude e tipo de solo
- **Culturas**: Gerenciamento de culturas disponíveis

### ⚠️ Disclaimer
- Informações sobre limitações e uso apenas para demonstração

## 🏗️ Arquitetura

```
planejador-semeadura/
├── backend/                 # API Node.js + Express
│   ├── server.js           # Servidor principal
│   ├── package.json        # Dependências backend
│   ├── Dockerfile         # Container backend
│   └── data/              # Arquivos CSV
├── frontend/               # React + Vite
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/        # Páginas da aplicação
│   │   └── services/     # Configuração da API
│   ├── package.json      # Dependências frontend
│   ├── Dockerfile       # Container frontend
│   └── nginx.conf       # Configuração Nginx
├── data/                 # Dados CSV compartilhados
└── docker-compose.yml   # Orquestração dos containers
```

## 🚀 Como Executar

### Pré-requisitos
- Docker
- Docker Compose

### Execução com Docker (Recomendado)

1. **Clone o repositório**:
```bash
git clone <url-do-repositorio>
cd planejador-semeadura
```

2. **Execute com Docker Compose**:
```bash
docker-compose up --build
```

3. **Acesse a aplicação**:
- Frontend: http://localhost
- Backend API: http://localhost:3001/api

### Execução Manual (Desenvolvimento)

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📊 Dados

### Arquivos CSV Inicializados Automaticamente

**`data/talhoes.csv`**
```csv
id,latitude,longitude,tipoSolo
1,-18.9186,-48.2772,Latossolo Vermelho
2,-18.9200,-48.2800,Argissolo Vermelho
3,-18.9150,-48.2750,Neossolo Quartzarênico
```

**`data/culturas.csv`**
```csv
id,nome
1,Soja
2,Milho
3,Algodão
4,Feijão
5,Trigo
```

**`data/enso.csv`**
```csv
Season,La Niña,Neutral,El Niño
DJF,25,45,30
MAM,30,40,30
JJA,35,35,30
SON,20,50,30
```

## 🔧 API Endpoints

### Talhões
- `GET /api/talhoes` - Listar talhões
- `POST /api/talhoes` - Criar talhão

### Culturas
- `GET /api/culturas` - Listar culturas
- `POST /api/culturas` - Criar cultura

### Dados Climáticos
- `GET /api/enso` - Dados ENSO

### Produtividade
- `GET /api/produtividade?cultura=X&ciclo=Y&fenomeno=Z` - Dados simulados

## 🎨 Design

### Paleta de Cores
- **Verde Agro**: Tons de verde (#22c55e, #16a34a, #15803d)
- **Marrom Agro**: Tons terrosos (#a18072, #846358)
- **Amarelo Agro**: Tons dourados (#eab308, #ca8a04)

### Responsividade
- Design adaptável para desktop, tablet e mobile
- Grid layout flexível
- Componentes otimizados para diferentes tamanhos de tela

## 🛠️ Tecnologias

### Frontend
- **React 18**: Framework principal
- **Vite**: Build tool e dev server
- **Tailwind CSS**: Framework CSS utilitário
- **Chart.js**: Gráficos e visualizações
- **React Router**: Navegação SPA
- **Axios**: Cliente HTTP

### Backend
- **Node.js**: Runtime JavaScript
- **Express**: Framework web
- **CSV Parse/Stringify**: Manipulação de CSV
- **CORS**: Cross-origin resource sharing
- **fs-extra**: File system utilities

### DevOps
- **Docker**: Containerização
- **Docker Compose**: Orquestração
- **Nginx**: Web server e proxy reverso

## 📈 Simulação de Dados

### Produtividade
A produtividade é calculada com base em:
- **Cultura base**: Cada cultura tem produtividade média diferente
- **Ciclo**: Ciclos mais longos aumentam produtividade
- **Fenômeno climático**: El Niño (-10%), Neutro (0%), La Niña (+10%)
- **Variação aleatória**: ±20% para simular variabilidade natural

### Períodos
- Dados gerados para períodos de 10 em 10 dias ao longo do ano
- 5 valores simulados por período para construção do boxplot

## ⚠️ Disclaimer

**Esta aplicação é um MVP e serve somente para demonstração.**

### Limitações
- Dados simulados não baseados em pesquisa real
- Algoritmos simplificados de produtividade
- Não considera variáveis climáticas reais
- Não substitui consultoria agronômica profissional

### Para Produção
- Integrar com APIs de dados meteorológicos oficiais
- Implementar modelos agronômicos validados
- Adicionar autenticação e autorização
- Migrar para banco de dados robusto
- Consultar especialistas agronômicos

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

---

**Desenvolvido como MVP para demonstração de conceitos de planejamento agrícola e arquitetura de software.**