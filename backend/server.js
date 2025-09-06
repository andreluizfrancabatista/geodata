const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const { parse } = require('csv-parse');
const { stringify } = require('csv-stringify');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Diretório dos dados CSV
const dataDir = path.join(__dirname, 'data');

// Garantir que o diretório de dados existe
fs.ensureDirSync(dataDir);

// Utility function para ler CSV
const readCSV = (filename) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(dataDir, filename);
    
    if (!fs.existsSync(filePath)) {
      resolve([]);
      return;
    }

    const results = [];
    fs.createReadStream(filePath)
      .pipe(parse({ 
        columns: true, 
        skip_empty_lines: true,
        trim: true 
      }))
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

// Utility function para escrever CSV
const writeCSV = (filename, data, headers) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(dataDir, filename);
    
    stringify(data, { 
      header: true,
      columns: headers
    }, (err, output) => {
      if (err) {
        reject(err);
        return;
      }
      
      fs.writeFile(filePath, output, (writeErr) => {
        if (writeErr) {
          reject(writeErr);
        } else {
          resolve();
        }
      });
    });
  });
};

// Função para gerar dados de produtividade simulados
const generateProductivityData = (cultura, ciclo, fenomeno) => {
  const periods = [];
  const currentYear = new Date().getFullYear();
  
  // Gerar períodos de 10 em 10 dias
  for (let month = 1; month <= 12; month++) {
    for (let day = 10; day <= 30; day += 10) {
      if (month === 2 && day === 30) continue; // Pular 30 de fevereiro
      periods.push(`${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`);
    }
  }

  // Base de produtividade por cultura
  const baseProd = {
    'Soja': 3200,
    'Milho': 8500,
    'Algodão': 1800,
    'Feijão': 1200,
    'Trigo': 2800
  };

  // Multiplicador por fenômeno climático
  const climateMultiplier = {
    'El Niño': 0.9,
    'Neutro': 1.0,
    'La Niña': 1.1
  };

  // Multiplicador por ciclo (ciclos mais longos tendem a ser mais produtivos)
  const cycleMultiplier = 0.8 + (ciclo - 80) * 0.003;

  const baseProductivity = (baseProd[cultura] || 3000) * 
                          (climateMultiplier[fenomeno] || 1.0) * 
                          cycleMultiplier;

  return periods.map(period => {
    // Gerar 5 valores simulados para cada período (para o boxplot)
    const values = [];
    for (let i = 0; i < 5; i++) {
      // Variação aleatória de ±20%
      const variation = 0.8 + (Math.random() * 0.4);
      values.push(Math.round(baseProductivity * variation));
    }
    
    return {
      period,
      values: values.sort((a, b) => a - b), // Ordenar para facilitar o boxplot
      min: Math.min(...values),
      max: Math.max(...values),
      median: values[2], // Valor do meio
      q1: values[1],
      q3: values[3]
    };
  });
};

// Rotas da API

// GET - Talhões
app.get('/api/talhoes', async (req, res) => {
  try {
    const talhoes = await readCSV('talhoes.csv');
    res.json(talhoes);
  } catch (error) {
    console.error('Erro ao ler talhões:', error);
    res.status(500).json({ error: 'Erro ao carregar talhões' });
  }
});

// POST - Adicionar Talhão
app.post('/api/talhoes', async (req, res) => {
  try {
    const { latitude, longitude, tipoSolo } = req.body;
    
    if (!latitude || !longitude || !tipoSolo) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const talhoes = await readCSV('talhoes.csv');
    const novoTalhao = {
      id: Date.now().toString(),
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      tipoSolo: tipoSolo.toString()
    };

    talhoes.push(novoTalhao);
    await writeCSV('talhoes.csv', talhoes, ['id', 'latitude', 'longitude', 'tipoSolo']);
    
    res.status(201).json(novoTalhao);
  } catch (error) {
    console.error('Erro ao adicionar talhão:', error);
    res.status(500).json({ error: 'Erro ao adicionar talhão' });
  }
});

// GET - Culturas
app.get('/api/culturas', async (req, res) => {
  try {
    const culturas = await readCSV('culturas.csv');
    res.json(culturas);
  } catch (error) {
    console.error('Erro ao ler culturas:', error);
    res.status(500).json({ error: 'Erro ao carregar culturas' });
  }
});

// POST - Adicionar Cultura
app.post('/api/culturas', async (req, res) => {
  try {
    const { nome } = req.body;
    
    if (!nome) {
      return res.status(400).json({ error: 'Nome da cultura é obrigatório' });
    }

    const culturas = await readCSV('culturas.csv');
    const novaCultura = {
      id: Date.now().toString(),
      nome: nome.toString()
    };

    culturas.push(novaCultura);
    await writeCSV('culturas.csv', culturas, ['id', 'nome']);
    
    res.status(201).json(novaCultura);
  } catch (error) {
    console.error('Erro ao adicionar cultura:', error);
    res.status(500).json({ error: 'Erro ao adicionar cultura' });
  }
});

// GET - Dados ENSO
app.get('/api/enso', async (req, res) => {
  try {
    const ensoData = await readCSV('enso.csv');
    res.json(ensoData);
  } catch (error) {
    console.error('Erro ao ler dados ENSO:', error);
    res.status(500).json({ error: 'Erro ao carregar dados ENSO' });
  }
});

// GET - Dados de produtividade simulados
app.get('/api/produtividade', async (req, res) => {
  try {
    const { cultura, ciclo, fenomeno } = req.query;
    
    if (!cultura || !ciclo || !fenomeno) {
      return res.status(400).json({ 
        error: 'Parâmetros cultura, ciclo e fenomeno são obrigatórios' 
      });
    }

    const produtividadeData = generateProductivityData(
      cultura, 
      parseInt(ciclo), 
      fenomeno
    );
    
    res.json(produtividadeData);
  } catch (error) {
    console.error('Erro ao gerar dados de produtividade:', error);
    res.status(500).json({ error: 'Erro ao gerar dados de produtividade' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Inicializar dados padrão se não existirem
const initializeDefaultData = async () => {
  try {
    // Dados padrão dos talhões
    const defaultTalhoes = [
      { id: '1', latitude: '-18.9186', longitude: '-48.2772', tipoSolo: 'Latossolo Vermelho' },
      { id: '2', latitude: '-18.9200', longitude: '-48.2800', tipoSolo: 'Argissolo Vermelho' },
      { id: '3', latitude: '-18.9150', longitude: '-48.2750', tipoSolo: 'Neossolo Quartzarênico' }
    ];

    // Dados padrão das culturas
    const defaultCulturas = [
      { id: '1', nome: 'Soja' },
      { id: '2', nome: 'Milho' },
      { id: '3', nome: 'Algodão' },
      { id: '4', nome: 'Feijão' },
      { id: '5', nome: 'Trigo' }
    ];

    // Dados ENSO (probabilidades por estação)
    const defaultEnso = [
      { Season: 'DJF', 'La Niña': 25, Neutral: 45, 'El Niño': 30 },
      { Season: 'MAM', 'La Niña': 30, Neutral: 40, 'El Niño': 30 },
      { Season: 'JJA', 'La Niña': 35, Neutral: 35, 'El Niño': 30 },
      { Season: 'SON', 'La Niña': 20, Neutral: 50, 'El Niño': 30 }
    ];

    // Criar arquivos se não existirem
    if (!fs.existsSync(path.join(dataDir, 'talhoes.csv'))) {
      await writeCSV('talhoes.csv', defaultTalhoes, ['id', 'latitude', 'longitude', 'tipoSolo']);
      console.log('Arquivo talhoes.csv inicializado');
    }

    if (!fs.existsSync(path.join(dataDir, 'culturas.csv'))) {
      await writeCSV('culturas.csv', defaultCulturas, ['id', 'nome']);
      console.log('Arquivo culturas.csv inicializado');
    }

    if (!fs.existsSync(path.join(dataDir, 'enso.csv'))) {
      await writeCSV('enso.csv', defaultEnso, ['Season', 'La Niña', 'Neutral', 'El Niño']);
      console.log('Arquivo enso.csv inicializado');
    }

  } catch (error) {
    console.error('Erro ao inicializar dados padrão:', error);
  }
};

// Inicializar servidor
const startServer = async () => {
  await initializeDefaultData();
  
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📊 API disponível em http://localhost:${PORT}/api`);
  });
};

startServer();