import db from '../db'
export async function loginUser(req, res) {
  const { email, senha } = req.body;

  try {
    const [user] = await db.query(
      'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
      [email, senha]
    );

    if (!user) {
      return res.status(400).json({ error: 'Credenciais inválidas' });
    }

    res.json({ user }); // 👈 sempre retorna JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}