import React, { Fragment, useEffect, useState } from "react";

const listCart = () => {
  const [cartItems, setCart] = useState([]);

  //delete item from Cart

  const deleteCartItem = async (itemCode) => {
    try {
      const deleteCartItem = await fetch(
        `http://localhost:8000/cart/${itemCode}`,
        {
          method: "DELETE",
        }
      );

      setCart(cartItems.filter((cart) => cart.cartItemCode !== itemCode));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getCart = async () => {
    try {
      const response = await fetch("http://localhost:8000/cart");
      const jsonData = await response.json();

      setCart(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <Fragment>
      <body>
        {cartItems.map((cart) => (
          <tr key={cart.cartItemCode}>
            <p>{cart.cartItemName}</p>
            <p>{cart.cartItemPrice}</p>
            <button
              className="btn btn-danger"
              onClick={() => deleteCartItem(cart.cartItemCode)}
            >
              Delete Item
            </button>
          </tr>
        ))}
      </body>
    </Fragment>
  );
};

export default listCart;
