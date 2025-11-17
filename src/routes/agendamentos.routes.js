const express = require('express');
const router = express.Router();
const { getPool } = require('../db'); // <-- correto

router.get('/', async (req, res) => {
  try {
    const pool = getPool();

    const { filter } = req.query;

    let sql = `
      SELECT a.*, c.nome_cliente, s.nome_servico 
      FROM agendamento a
      LEFT JOIN cliente c ON a.id_cliente = c.id_cliente
      LEFT JOIN servico s ON a.id_servico = s.id_servico
    `;

    if (filter === 'today') sql += ' WHERE DATE(a.data_hora) = CURDATE()';
    else if (filter === 'future') sql += ' WHERE a.data_hora > NOW()';
    else if (filter === 'past') sql += ' WHERE a.data_hora < NOW()';

    const [rows] = await pool.query(sql);
    res.json(rows);
  } catch (err) {
    console.error('Erro ao listar agendamentos:', err);
    res.status(500).json({ error: 'Erro ao listar agendamentos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const pool = getPool();

    const { id_cliente, id_servico, id_usuario, data_hora, observacao } = req.body;

    const [result] = await pool.query(
      `INSERT INTO agendamento (id_cliente, id_servico, id_usuario, data_hora, observacao)
       VALUES (?, ?, ?, ?, ?)`,
      [id_cliente, id_servico, id_usuario, data_hora, observacao]
    );

    res.status(201).json({ id: result.insertId });

  } catch (err) {
    console.error('Erro ao criar agendamento:', err);
    res.status(500).json({ error: 'Erro ao criar agendamento' });
  }
});

module.exports = router;
