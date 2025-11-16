const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { init, pool } = require('./db');


console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

const clientesRoutes = require('./routes/clientes.routes');
const produtosRoutes = require('./routes/produtos.routes');
const servicosRoutes = require('./routes/servicos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const agendamentosRoutes = require('./routes/agendamentos.routes');
const horariosRoutes = require('./routes/horarios.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(cors({
  origin: [
    "https://barber-system-rosy.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/servicos', servicosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/agendamentos', agendamentosRoutes);
app.use('/api/horarios', horariosRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

init().then(() => {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
