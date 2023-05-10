const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('supplier', {
    supplierid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    suppliername: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    contactperson: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    suppliernumber: {
      type: DataTypes.CHAR(8),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'supplier',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "supplier_pkey",
        unique: true,
        fields: [
          { name: "supplierid" },
        ]
      },
    ]
  });
};
