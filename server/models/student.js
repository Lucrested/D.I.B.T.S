const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student', {
    customerid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'customer',
        key: 'customerid'
      }
    },
    major: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'student',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "student_pkey",
        unique: true,
        fields: [
          { name: "customerid" },
        ]
      },
    ]
  });
};
