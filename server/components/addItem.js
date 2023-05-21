import React, { Fragment, useEffect, useState } from "react";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const addToCart = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8000/cart/${itemId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Item added to cart successfully");
      } else {
        console.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.itemName}
            <button
              className="btn btn-success"
              onClick={() => addToCart(item.itemCode)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
