const express = require("express");
const cors = require("cors");

require("dotenv").config();

const titlesRouter = require("./src/routes/titles");

const app = express(); // Creating an instance of the Express application
const PORT = process.env.PORT || 3000; // Setting the port to the value specified in the environment variable or defaulting to 3000

// Middleware for processing JSON
app.use(express.json());

app.use(cors()); // Using CORS middleware to enable cross-origin requests

// Middleware for parsing the request body as JSON
app.use(express.json());

app.use("/titles", titlesRouter); // Using the titlesRouter for routes starting with "/titles"

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
