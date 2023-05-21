const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const app = express();

var corsOptions = {
  origin: "http://localhost:3001",
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
    const allItems = await pool.query(
      "SELECT cart.itemcode, cart.cartItemQuantity, item.itemname,item.itemprice*cart.cartitemquantity AS totalItemPrice, imageHREF FROM Cart JOIN Item ON Cart.itemcode = Item.itemcode"
    );
    res.json(allItems.rows);
  } catch (error) {
    console.log(error.message);
  }
});
//Add new item to the cart

app.post("/cart/:itemcode", async (req, res) => {
  try {
    console.log(req.params);
    const { itemcode } = req.params;
    const { cartItemQuantity } = req.body;
    const cartItem = await pool.query(
      "SELECT * FROM Cart WHERE itemcode = $1",
      [itemcode]
    );
    if (cartItem.rowCount == 0) {
      const newItemCart = await pool.query(
        "INSERT INTO Cart (itemCode, cartItemQuantity) VALUES($1, $2) ",
        [itemcode, cartItemQuantity]
      );
    } else {
      const updateItem = await pool.query(
        "UPDATE Cart SET cartItemQuantity = cartItemQuantity + $1 WHERE itemcode = $2",
        [cartItemQuantity, itemcode]
      );
    }
    return res.send("Item was added to cart successfully.");
  } catch (err) {
    console.error(err.message);
    return res.send(err.message);
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

    res.send("Item was deleted from Cart");
  } catch (err) {
    res.send(err.message);
    console.error(err.message);
  }
});

// update item in cart UNTESTED!!!!!!!

app.put("/cart:itemCode", async (req, res) => {
  try {
    const { itemCode } = req.params;
    const { cartItemQuantity } = req.body;
    const updateCart = await pool.query(
      "UPDATE Cart SET cartItemQuantity = $1 WHERE itemCode = $2",
      [cartItemQuantity, itemCode]
    );

    res.send("Cart was updated");
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/checkout", async (req, res) => {
  try {
    const checkout = await pool.query("CALL CheckOut()");

    res.send("Checkout complete. Your invoice has been created.");
  } catch (err) {
    res.send(err.message);
    console.error(err.message);
  }
});
