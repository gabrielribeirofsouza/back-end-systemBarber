const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// GET usuários
router.get('/', async (req, res) => {
  const [rows] = await req.pool.query(
    'SELECT id_usuario, nome_usuario, email_usuario, telefone_usuario FROM usuario'
  );
  res.json(rows);
});

// UPDATE usuário
router.put('/:id', async (req, res) => {
  const { nome_usuario, telefone_usuario } = req.body;
  
  await req.pool.query(
    'UPDATE usuario SET nome_usuario = ?, telefone_usuario = ? WHERE id_usuario = ?',
    [nome_usuario, telefone_usuario, req.params.id]
  );

  res.json({ ok: true });
});

// DELETE usuário
router.delete('/:id', async (req, res) => {
  await req.pool.query(
    'DELETE FROM usuario WHERE id_usuario = ?',
    [req.params.id]
  );

  res.json({ ok: true });
});

module.exports = router;