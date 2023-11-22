const pool = require("../db/db");

async function getAllTitles() {
  try {
    const result = await pool.query("SELECT * FROM titles");
    return result.rows;
  } catch (error) {
    throw new Error("Erro ao buscar títulos no banco de dados");
  }
}

async function getTitlesByPage(pageNumber, pageSize) {
  try {
    const offset = (pageNumber - 1) * pageSize;
    const query = {
      text: "SELECT * FROM titles ORDER BY id OFFSET $1 LIMIT $2",
      values: [offset, pageSize],
    };
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error("Erro ao buscar títulos no banco de dados");
  }
}

async function getUnclassifiedTitles(limit) {
  try {
    const query = {
      text: "SELECT * FROM titles WHERE classification IS NULL LIMIT $1",
      values: [limit],
    };
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error(
      "Erro ao buscar títulos não classificados no banco de dados"
    );
  }
}

async function updateClassificationById(id, classification) {
  try {
    const query = {
      text: "UPDATE titles SET classification = $1 WHERE id = $2",
      values: [classification, id],
    };
    const result = await pool.query(query);
    return result.rowCount;
  } catch (error) {
    throw new Error("Erro ao atualizar a classificação no banco de dados");
  }
}

module.exports = {
  getAllTitles,
  getTitlesByPage,
  getUnclassifiedTitles,
  updateClassificationById,
};
