const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

app.listen(8000, () => console.log("Server Started"));

app.get("/menu", async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM Item");
    res.json(allItems.rows);
  } catch (error) {
    console.log(error.message);
  }
});
