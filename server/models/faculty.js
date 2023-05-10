const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('faculty', {
    customerid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'customer',
        key: 'customerid'
      }
    },
    department: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'faculty',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "faculty_pkey",
        unique: true,
        fields: [
          { name: "customerid" },
        ]
      },
    ]
  });
};
