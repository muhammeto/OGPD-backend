'use strict';
module.exports = (sequelize, DataTypes) => {
  const Nation = sequelize.define('Nation', {
    Name: DataTypes.STRING
  }, {});
  Nation.associate = function(models) {
    // associations can be defined here
  };
  return Nation;
};