const express = require('express');
const cors = require('cors');
require('dotenv').config();

const clientesRoutes = require('./routes/clientes.routes');
const produtosRoutes = require('./routes/produtos.routes');
const servicosRoutes = require('./routes/servicos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const agendamentosRoutes = require('./routes/agendamentos.routes');
const horariosRoutes = require('./routes/horarios.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/servicos', servicosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/agendamentos', agendamentosRoutes);
app.use('/api/horarios', horariosRoutes);

app.get('/api/health', (req,res)=> res.json({ok:true}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
