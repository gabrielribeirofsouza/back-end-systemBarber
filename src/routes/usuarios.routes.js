const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// GET usuários
router.get('/', async (req, res) => {
  try {
    const pool = req.pool;

    const [rows] = await pool.query(
      'SELECT id_usuario, nome_usuario, email_usuario, telefone_usuario FROM usuario'
    );

    res.json(rows);
  } catch (err) {
    console.error("Erro ao listar usuários:", err);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// UPDATE usuário
router.put('/:id', async (req, res) => {
  try {
    const pool = req.pool;
    const { nome_usuario, telefone_usuario } = req.body;

    await pool.query(
      'UPDATE usuario SET nome_usuario = ?, telefone_usuario = ? WHERE id_usuario = ?',
      [nome_usuario, telefone_usuario, req.params.id]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

// DELETE usuário
router.delete('/:id', async (req, res) => {
  try {
    const pool = req.pool;

    await pool.query(
      'DELETE FROM usuario WHERE id_usuario = ?',
      [req.params.id]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error("Erro ao deletar usuário:", err);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
});

module.exports = router;
