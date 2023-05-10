const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('staff', {
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    stafffname: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    stafflname: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    staffphone: {
      type: DataTypes.CHAR(8),
      allowNull: false
    },
    staffemail: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    staffdob: {
      type: DataTypes.CHAR(8),
      allowNull: false
    },
    staffpassword: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    jobcode: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'job',
        key: 'jobcode'
      }
    }
  }, {
    sequelize,
    tableName: 'staff',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "staff_pkey",
        unique: true,
        fields: [
          { name: "staffid" },
        ]
      },
    ]
  });
};
