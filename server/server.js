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

//List all items

app.get("/menu", async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM Item");
    res.json(allItems.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//List all items in cart

app.get("/cart", async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM Cart");
    res.json(allItems.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//Add new item to the cart

app.post("/cart", async (req, res) => {
  try {
    const { itemCode, cartItemQuantity, cartItemName, cartItemPrice } =
      req.body;
    const newItemCart = await pool.query(
      "INSERT INTO Cart (itemCode, cartItemQuantity, cartItemName, cartItemPrice) VALUES($1, $2, $3, $4) ",
      [itemCode, cartItemQuantity, cartItemName, cartItemPrice]
    );

    res.json(newItemCart.fields);
  } catch (err) {
    console.error(err.message);
  }
});

// deleting an item from cart

app.delete("/cart/:itemCode", async (req, res) => {
  try {
    const { itemCode } = req.params;
    const deleteItem = await pool.query(
      "DELETE FROM Cart WHERE itemCode = $1",
      [itemCode]
    );

    res.json("Item with deleted from Cart");
  } catch (err) {
    console.error(err.message);
  }
});
