const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('line', {
    invoicenumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'invoice',
        key: 'invoicenumber'
      },
      unique: "line_invoicenumber_itemcode_key"
    },
    linenumber: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      primaryKey: true
    },
    itemcode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'item',
        key: 'itemcode'
      },
      unique: "line_invoicenumber_itemcode_key"
    },
    linequantity: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    unitprice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'line',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "line_invoicenumber_itemcode_key",
        unique: true,
        fields: [
          { name: "invoicenumber" },
          { name: "itemcode" },
        ]
      },
      {
        name: "line_pkey",
        unique: true,
        fields: [
          { name: "invoicenumber" },
          { name: "linenumber" },
        ]
      },
    ]
  });
};
