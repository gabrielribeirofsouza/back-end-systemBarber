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
const allowedOrigins = [
  "https://barber-system-rosy.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}));

app.options("*", cors());
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

const PORT = process.env.PORT || 8080;
init().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
