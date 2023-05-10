const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer', {
    customerid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customerfname: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    customerlname: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    customerphone: {
      type: DataTypes.CHAR(8),
      allowNull: false
    },
    customeremail: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    customerbalance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    },
    customerpassword: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    cus_type: {
      type: DataTypes.CHAR(1),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'customer',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "customer_pkey",
        unique: true,
        fields: [
          { name: "customerid" },
        ]
      },
    ]
  });
};
