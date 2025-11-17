const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { init, getPool } = require('./db');



const clientesRoutes = require('./routes/clientes.routes');
const produtosRoutes = require('./routes/produtos.routes');
const servicosRoutes = require('./routes/servicos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const agendamentosRoutes = require('./routes/agendamentos.routes');
const horariosRoutes = require('./routes/horarios.routes');
const authRoutes = require('./routes/auth.routes');


async function startServer() {
  await init(); // Inicializa pool ANTES de carregar rotas

  const app = express();
  app.use(cors({
    origin: "https://barber-system-rosy.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  }));
  
  app.use(express.json());

  // Middleware para adicionar o pool às requisições
app.use((req, res, next) => {
  req.pool = getPool();
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

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
}

startServer();
