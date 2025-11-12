const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

router.get('/', async (req,res) => {
  const [rows] = await pool.query('SELECT id_usuario, nome_usuario, email_usuario, telefone_usuario FROM usuario');
  res.json(rows);
});

router.put('/:id', async (req,res) => {
  const { nome_usuario, telefone_usuario } = req.body;
  await pool.query('UPDATE usuario SET nome_usuario = ?, telefone_usuario = ? WHERE id_usuario = ?', [nome_usuario, telefone_usuario, req.params.id]);
  res.json({ ok: true });
});

router.delete('/:id', async (req,res) => {
  await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [req.params.id]);
  res.json({ ok: true });
});

module.exports = router;
