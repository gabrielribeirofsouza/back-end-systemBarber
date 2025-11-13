const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req,res) => {
  const { email, senha } = req.body;
  const [rows] = await pool.query('SELECT * FROM usuario WHERE email_usuario = ?', [email]);
  const user = rows[0];
  if(!user) return res.status(401).json({error: 'Credenciais inválidas'});
  const match = await bcrypt.compare(senha, user.senha_usuario);
  if(!match) return res.status(401).json({error:'Credenciais inválidas'});
  const token = jwt.sign({ id: user.id_usuario, email: user.email_usuario }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, user: { id: user.id_usuario, nome: user.nome_usuario, email: user.email_usuario, tipo: user.tipo_usuario } });
});

module.exports = router;
