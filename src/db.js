const mysql = require('mysql2/promise');

// Função para criar pool e testar a conexão
async function createPool() {
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: +process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Teste de conexão
    const connection = await pool.getConnection();
    console.log(' Conexão com MySQL bem-sucedida!');
    connection.release();

    return pool;
  } catch (err) {
    console.error(' Erro ao conectar no MySQL:');
    console.error(err);
    process.exit(1); // encerra o container para o Railway saber que o deploy falhou
  }
}

module.exports = createPool();
