async function getAllProdutos(pool) {
  const [rows] = await pool.query('SELECT * FROM produto');
  return rows;
}

async function getProdutoById(pool, id) {
  const [rows] = await pool.query('SELECT * FROM produto WHERE id_produto = ?', [id]);
  return rows[0];
}

async function createProduto(pool, data) {
  const [result] = await pool.query(
    `INSERT INTO produto (nome_produto, estoque_produto, status_produto, categoria_produto, descricao_produto, preco_produto)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.nome_produto,
      data.estoque_produto,
      data.status_produto,
      data.categoria_produto,
      data.descricao_produto,
      data.preco_produto
    ]
  );

  return result.insertId;
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
  return getProdutoById(pool, id);
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