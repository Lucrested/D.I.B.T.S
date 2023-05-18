import React, { Fragment, useEffect, useState } from "react";

const listMenu = () => {
  const [menu, setMenu] = useState([]);

  const getMenu = async () => {
    try {
      const response = await fetch("http://localhost:8000/menu");
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
        {menu.map((Item) => (
          <tr key={Item.itemCode}>
            <p>{Item.itemName}</p>
            <p>{Item.itemDescription}</p>
            <p>{Item.itemPrice}</p>
            <input
              type="number"
              id="quantity"
              min="1"
              max="10"
              step="1"
            ></input>
          </tr>
        ))}
      </body>
    </Fragment>
  );
};

export default listMenu;
