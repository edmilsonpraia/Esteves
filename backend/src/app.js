// ====================================
// APLICAÇÃO EXPRESS - AFRICA'S HANDS API
// ====================================

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// ====================================
// MIDDLEWARES
// ====================================

// Segurança
app.use(helmet());

// CORS - permitir React
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logs
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Parse JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ====================================
// ROTAS DE TESTE
// ====================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    message: '🟢 Africa\'s Hands API está funcionando!',
    timestamp: new Date().toISOString(),
    database: 'PostgreSQL Elves',
    version: '1.0.0'
  });
});

// Rota de teste da base de dados
app.get('/api/test-db', async (req, res) => {
  try {
    const { query } = require('./config/database');
    const result = await query('SELECT COUNT(*) as total FROM countries');
    
    res.json({
      message: '✅ Conexão com a base de dados OK',
      countries_count: result.rows[0].total,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      message: '❌ Erro na conexão com a base de dados',
      error: error.message
    });
  }
});

// ====================================
// ROTAS PRINCIPAIS
// ====================================

// Importar rotas (criaremos depois)
const countriesRoutes = require('./routes/countries');
const sectorsRoutes = require('./routes/sectors');
const opportunitiesRoutes = require('./routes/opportunities');
const applicationsRoutes = require('./routes/applications');

// Registrar rotas
app.use('/api/countries', countriesRoutes);
app.use('/api/sectors', sectorsRoutes);
app.use('/api/opportunities', opportunitiesRoutes);
app.use('/api/applications', applicationsRoutes);

// ====================================
// MIDDLEWARE DE ERRO
// ====================================

app.use((err, req, res, next) => {
  console.error('❌ Erro:', err.stack);
  
  res.status(err.status || 500).json({
    message: err.message || 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

// 404 - Rota não encontrada
app.use('*', (req, res) => {
  res.status(404).json({
    message: '🔍 Rota não encontrada',
    path: req.originalUrl,
    method: req.method
  });
});

module.exports = app;