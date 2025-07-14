// ====================================
// SERVIDOR AFRICA'S HANDS API
// ====================================

const app = require('./app');
const { testConnection } = require('./config/database');

const PORT = process.env.PORT || 5000;

// Função para iniciar o servidor
const startServer = async () => {
  try {
    // Testar conexão com a base de dados
    console.log('🔍 Testando conexão com a base de dados...');
    await testConnection();
    
    // Iniciar servidor
    const server = app.listen(PORT, () => {
      console.log('🚀 =======================================');
      console.log('🚀 AFRICA\'S HANDS API');
      console.log('🚀 =======================================');
      console.log(`🌍 Servidor rodando na porta: ${PORT}`);
      console.log(`🔗 URL: http://localhost:${PORT}`);
      console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🗄️  Test DB: http://localhost:${PORT}/api/test-db`);
      console.log('🚀 =======================================');
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('⏹️  Recebido SIGTERM. Encerrando servidor...');
      server.close(() => {
        console.log('✅ Servidor encerrado com sucesso');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('⏹️  Recebido SIGINT. Encerrando servidor...');
      server.close(() => {
        console.log('✅ Servidor encerrado com sucesso');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

// Iniciar servidor
startServer();