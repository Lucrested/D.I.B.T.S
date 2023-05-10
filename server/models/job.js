const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job', {
    jobcode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    jobname: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    hourspay: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'job',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "job_pkey",
        unique: true,
        fields: [
          { name: "jobcode" },
        ]
      },
    ]
  });
};
