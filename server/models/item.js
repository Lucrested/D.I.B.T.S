const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('item', {
    itemcode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    itemdescription: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    itemname: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    itemprice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    itemquantity: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    supplierid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'supplier',
        key: 'supplierid'
      }
    }
  }, {
    sequelize,
    tableName: 'item',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "item_pkey",
        unique: true,
        fields: [
          { name: "itemcode" },
        ]
      },
    ]
  });
};
