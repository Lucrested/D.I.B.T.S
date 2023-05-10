const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('invoice', {
    invoicenumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customerid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customer',
        key: 'customerid'
      }
    },
    invoicedate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'staff',
        key: 'staffid'
      }
    }
  }, {
    sequelize,
    tableName: 'invoice',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "invoice_pkey",
        unique: true,
        fields: [
          { name: "invoicenumber" },
        ]
      },
    ]
  });
};
