const express = require('express');
const router = express.Router();
const { getPool } = require('../db');

// GET serviços
router.get('/', async (req, res) => {
  try {
    const pool = req.pool;
    const [rows] = await pool.query('SELECT * FROM servico');
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar serviços:', err);
    res.status(500).json({ error: 'Erro ao buscar serviços' });
  }
});

// POST serviço
router.post('/', async (req, res) => {
  try {
    const pool = req.pool;
    const { nome_servico, descricao_servico, preco_servico, duracao_servico, status_servico } = req.body;

    const [result] = await pool.query(
      `INSERT INTO servico (nome_servico, descricao_servico, preco_servico, duracao_servico, status_servico) 
       VALUES (?, ?, ?, ?, ?)`,
      [nome_servico, descricao_servico, preco_servico, duracao_servico, status_servico]
    );

    res.status(201).json({
      id: result.insertId,
      nome_servico,
      descricao_servico,
      preco_servico,
      duracao_servico,
      status_servico,
    });
  } catch (err) {
    console.error('Erro ao criar serviço:', err);
    res.status(500).json({ error: 'Erro ao criar serviço' });
  }
});

// PUT serviço
router.put('/:id', async (req, res) => {
  try {
    const pool = req.pool;

    const id = Number(req.params.id);
    const { nome_servico, descricao_servico, preco_servico, duracao_servico, status_servico } = req.body;

    const [result] = await pool.query(
      `UPDATE servico 
       SET nome_servico=?, descricao_servico=?, preco_servico=?, duracao_servico=?, status_servico=? 
       WHERE id_servico=?`,
      [nome_servico, descricao_servico, preco_servico, duracao_servico, status_servico, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }

    res.json({ message: 'Serviço atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar serviço:', err);
    res.status(500).json({ error: 'Erro ao atualizar serviço' });
  }
});

// DELETE serviço
router.delete('/:id', async (req, res) => {
  try {
    const pool = req.pool;

    const id = Number(req.params.id);

    const [result] = await pool.query('DELETE FROM servico WHERE id_servico = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error('Erro ao excluir serviço:', err);
    res.status(500).json({ error: 'Erro ao excluir serviço' });
  }
});

module.exports = router;
