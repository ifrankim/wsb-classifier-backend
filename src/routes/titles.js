// src/routes/titles.js
const express = require("express");
const router = express.Router();
const titleModel = require("../models/titleModel");

// router.get("/", async (req, res) => {
//   try {
//     const titles = await titleModel.getAllTitles();
//     res.json(titles);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: `Erro ao buscar títulos: ${error}` });
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const pageNumber = parseInt(req.query.pageNumber) || 1;
//     const pageSize = parseInt(req.query.pageSize) || 10;

//     const titles = await titleModel.getTitlesByPage(pageNumber, pageSize);

//     res.json({ titles });
//   } catch (error) {
//     res.status(500).json({ error: "Erro ao buscar os títulos" });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const titles = await titleModel.getUnclassifiedTitles(limit);

    res.json({ titles });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar os títulos" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { id, classification } = req.body;

    const rowCount = await titleModel.updateClassificationById(
      id,
      classification
    );

    if (rowCount === 1) {
      res.json({
        success: true,
        message: "Classificação atualizada com sucesso",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "ID não encontrado ou nenhum registro atualizado",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar a classificação" });
  }
});

module.exports = router;
