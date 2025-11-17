const express = require('express');
const router = express.Router();
const { getPool } = require('../db');

// GET clientes
router.get('/', async (req, res) => {
  const pool = getPool();

  const [rows] = await pool.query('SELECT * FROM cliente');
  res.json(rows);
});

// POST cliente
router.post('/', async (req, res) => {
  const pool = getPool();

  const { nome_cliente, telefone_cliente, email_cliente, data_cadastro } = req.body;

  const [result] = await pool.query(
    `INSERT INTO cliente (nome_cliente, telefone_cliente, email_cliente, data_cadastro)
     VALUES (?, ?, ?, ?)`,
    [nome_cliente, telefone_cliente, email_cliente, data_cadastro]
  );

  res.status(201).json({
    id: result.insertId,
    nome_cliente,
    telefone_cliente,
    email_cliente
  });
});

// DELETE cliente
router.delete('/:id', async (req, res) => {
  const pool = getPool();
  
  const id = Number(req.params.id);
  console.log("🧠 ID recebido para exclusão:", id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const [result] = await pool.query(
      'DELETE FROM cliente WHERE id_cliente = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    return res.status(204).send();
  } catch (err) {
    console.error('Erro ao excluir cliente:', err);
    return res.status(500).json({ error: 'Erro ao excluir cliente' });
  }
});

module.exports = router;
