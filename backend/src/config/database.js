// ====================================
// CONFIGURAÇÃO DA BASE DE DADOS ELVES
// ====================================

const { Pool } = require('pg');
require('dotenv').config();

// Configuração da conexão PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'Elves',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Eventos da conexão
pool.on('connect', () => {
  console.log('✅ Conectado à base de dados Elves (PostgreSQL)');
});

pool.on('error', (err) => {
  console.error('❌ Erro na conexão com a base de dados:', err);
  process.exit(-1);
});

// Função para executar queries
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log(`📊 Query executada em ${duration}ms: ${text.substring(0, 50)}...`);
    return res;
  } catch (error) {
    console.error('❌ Erro na query:', error.message);
    throw error;
  }
};

// Testar conexão na inicialização
const testConnection = async () => {
  try {
    await query('SELECT NOW()');
    console.log('🔗 Teste de conexão bem-sucedido');
  } catch (error) {
    console.error('❌ Falha no teste de conexão:', error.message);
    process.exit(-1);
  }
};

module.exports = {
  query,
  pool,
  testConnection
};