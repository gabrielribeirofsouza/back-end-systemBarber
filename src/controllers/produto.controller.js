const produtoModel = require('../models/produto.model');

async function list(req, res) {
  const produtos = await produtoModel.getAllProdutos(req.pool);
  res.json(produtos);
}

async function getById(req, res) {
  const p = await produtoModel.getProdutoById(req.pool, req.params.id);
  if (!p) return res.status(404).json({ error: 'Produto não encontrado' });
  res.json(p);
}

async function create(req, res) {
  const payload = req.body;
  const { id } = await produtoModel.createProduto(req.pool, payload);
  res.status(201).json({ id, ...payload });
}

async function update(req, res) {
  await produtoModel.updateProduto(req.pool, req.params.id, req.body);
  res.json({ ok: true });
}

async function remove(req, res) {
  await produtoModel.deleteProduto(req.pool, req.params.id);
  res.json({ ok: true });
}

module.exports = { list, getById, create, update, remove };
