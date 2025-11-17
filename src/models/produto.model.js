async function getAllProdutos(pool) {
  const [rows] = await pool.query('SELECT * FROM produto');
  return rows;
}

async function getProdutoById(pool, id) {
  const [rows] = await pool.query('SELECT * FROM produto WHERE id_produto = ?', [id]);
  return rows[0];
}

async function createProduto(pool, { nome_produto, estoque_produto, status_produto, categoria_produto, descricao_produto, preco_produto }) {
  const [result] = await pool.query(
    `INSERT INTO produto (nome_produto, estoque_produto, status_produto, categoria_produto, descricao_produto, preco_produto)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nome_produto, estoque_produto, status_produto, categoria_produto, descricao_produto, preco_produto]
  );
  return { id: result.insertId };
}

async function updateProduto(pool, id, fields) {
  const sets = [];
  const params = [];

  for (const k in fields) {
    sets.push(`${k} = ?`);
    params.push(fields[k]);
  }

  params.push(id);
  const sql = `UPDATE produto SET ${sets.join(', ')} WHERE id_produto = ?`;

  await pool.query(sql, params);
}

async function deleteProduto(pool, id) {
  await pool.query('DELETE FROM produto WHERE id_produto = ?', [id]);
}

module.exports = {
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
};