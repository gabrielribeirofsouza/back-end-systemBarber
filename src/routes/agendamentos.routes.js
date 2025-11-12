const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req,res) => {
  const { filter } = req.query;
  let sql = `SELECT a.*, c.nome_cliente, s.nome_servico FROM agendamento a
             LEFT JOIN cliente c ON a.id_cliente = c.id_cliente
             LEFT JOIN servico s ON a.id_servico = s.id_servico`;
  if (filter === 'today') sql += ' WHERE DATE(a.data_hora) = CURDATE()';
  else if (filter === 'future') sql += ' WHERE a.data_hora > NOW()';
  else if (filter === 'past') sql += ' WHERE a.data_hora < NOW()';
  const [rows] = await pool.query(sql);
  res.json(rows);
});

router.post('/', async (req,res) => {
  const { id_cliente, id_servico, id_usuario, data_hora, observacao } = req.body;
  const [result] = await pool.query(
    'INSERT INTO agendamento (id_cliente, id_servico, id_usuario, data_hora, observacao) VALUES (?, ?, ?, ?, ?)',
    [id_cliente, id_servico, id_usuario, data_hora, observacao]
  );
  res.status(201).json({ id: result.insertId });
});

module.exports = router;
