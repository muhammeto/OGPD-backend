'use strict';
module.exports = (sequelize, DataTypes) => {
  const Nation = sequelize.define('Nation', {
    Name: DataTypes.STRING
  }, {});
  Nation.associate = function (models) {
    Nation.hasMany(models.Character);
  };
  return Nation;
};