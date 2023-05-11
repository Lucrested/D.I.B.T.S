const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cart', {
    itemcode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'item',
        key: 'itemcode'
      }
    },
    cartitemquantity: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    cartitemname: {
      type: DataTypes.STRING(35),
      allowNull: true
    },
    cartitemprice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cart',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cart_pkey",
        unique: true,
        fields: [
          { name: "itemcode" },
        ]
      },
    ]
  });
};
