const express = require('express');
const router = express.Router();
const HorariosController = require('../controllers/horarios.controller');

// rota para listar os horários de um barbeiro
router.get('/:id_barbeiro', HorariosController.listar);

// rota para atualizar um horário específico
router.put('/:id_agenda', HorariosController.atualizar);



module.exports = router;