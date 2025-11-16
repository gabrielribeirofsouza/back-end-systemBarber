const mysql = require('mysql2/promise');

let pool; 

async function init() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: +process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const conn = await pool.getConnection();
    console.log(' Conexão com MySQL bem-sucedida!');
    conn.release();

    return pool;
  } catch (err) {
    console.error('❌ Erro ao conectar no MySQL:');
    console.error(err);
    process.exit(1);
  }
}

module.exports = { pool, init };
