const Horarios = require('../models/horarios.model');

exports.listar = async (req, res) => {
  try {
    const { id_barbeiro } = req.params;
    const horarios = await Horarios.buscarPorBarbeiro(id_barbeiro);

    if (!horarios.length) {
      // se o barbeiro não tem horários, cria os 7 dias padrão
      await Horarios.criarSemanaPadrao(id_barbeiro);
      const novos = await Horarios.buscarPorBarbeiro(id_barbeiro);
      return res.json(novos);
    }

    res.json(horarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar horários' });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { id_agenda } = req.params;
    const { hora_abertura, hora_fechamento, status_agenda } = req.body;

    await Horarios.atualizar(id_agenda, { hora_abertura, hora_fechamento, status_agenda });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar horário' });
  }
};

