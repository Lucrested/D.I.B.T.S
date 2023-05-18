// adding an item into cart

app.post("/cart", async (req, res) => {
try{
    const { itemCode, cartItemQuantity, cartItemName, cartItemPrice } = req.body;
    const newItemCart = await Pool.query("INSERT INTO Cart (itemCode, cartItemQuantity, cartItemName, cartItemPrice) VALUES($1, $2, $3, $4) ", 
    [ itemCode, cartItemQuantity, cartItemName, cartItemPrice]);

    res.json(newItemCart);

}catch (err) {
    console.error(err.message);
}

});

// deleting an item from cart

app.delete("/cart/:itemCode", async (req, res) => {
    try{
        const { itemCode } = req.params;
        const deleteItem = await Pool.query("DELETE FROM Cart WHERE itemCode = $1", [ itemCode]);
    
        res.json("Item deleted from Cart");
    
    }catch (err) {
        console.error(err.message);
    }
    
});

// update item in cart

app.put("/cart:itemCode", async (req,res) => {
    try{
        const { itemCode } = req.params;
        const { cartItemQuantity } = req.body;
        const updateCart = await pool.query( "UPDATE Cart SET cartItemQuantity = $1 WHERE itemCode = $2", 
        [cartItemQuantity, itemCode]
        );

        req.json("Cart was updated");
    }catch (err) {
        console.error(err.message);
    }


});
