const express = require("express");
const csv = require("csv-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar JSON
app.use(express.json());

app.use(cors());

// Middleware para analisar o corpo da solicitação como JSON
app.use(express.json());

// Rota para obter um título aleatório do CSV
app.get("/getRandomTitle", (req, res) => {
  const titles = [];
  fs.createReadStream("seu_arquivo.csv")
    .pipe(csv())
    .on("data", (row) => {
      titles.push(row.title);
    })
    .on("end", () => {
      const randomTitle = titles[Math.floor(Math.random() * titles.length)];
      res.json({ title: randomTitle });
    });
});

// Rota para receber a classificação e atualizar o CSV
app.post("/classifyTitle", (req, res) => {
  const { title, classification } = req.body;

  // Aqui você precisará implementar a lógica para atualizar o CSV com a classificação

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
