'use strict';
module.exports = (sequelize, DataTypes) => {
  const ItemBase = sequelize.define('ItemBase', {
    Name: DataTypes.STRING,
    Level: DataTypes.INTEGER
  }, {});
  ItemBase.associate = function (models) {
    ItemBase.hasMany(models.Item);
  };
  return ItemBase;
};