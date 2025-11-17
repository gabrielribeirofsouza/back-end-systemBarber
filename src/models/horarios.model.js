const { getPool } = require('../db');
const TABLE = 'agenda';

module.exports = {
  async buscarPorBarbeiro(id_barbeiro) {
    const pool = getPool();

    const [rows] = await pool.query(`
      SELECT id_agenda, id_barbeiro, dia_semana, 
             DATE_FORMAT(hora_abertura, '%H:%i') as hora_abertura,
             DATE_FORMAT(hora_fechamento, '%H:%i') as hora_fechamento,
             status_agenda
      FROM ${TABLE}
      WHERE id_barbeiro = ?
      ORDER BY dia_semana
    `, [id_barbeiro]);

    return rows;
  },

  async criarSemanaPadrao(id_barbeiro) {
    const pool = getPool();

    const dias = [0,1,2,3,4,5,6]; // domingo a sábado
    const valores = dias.map(d => [id_barbeiro, d, '09:00', '18:00', 1]);

    await pool.query(`
      INSERT INTO ${TABLE} (id_barbeiro, dia_semana, hora_abertura, hora_fechamento, status_agenda)
      VALUES ?
    `, [valores]);
  },

  async atualizar(id_agenda, { hora_abertura, hora_fechamento, status_agenda }) {
    const pool = getPool();

    await pool.query(`
      UPDATE ${TABLE} 
      SET hora_abertura=?, hora_fechamento=?, status_agenda=?
      WHERE id_agenda=?
    `, [hora_abertura, hora_fechamento, status_agenda, id_agenda]);
  }
};
