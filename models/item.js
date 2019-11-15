'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    CharacterID: DataTypes.INTEGER,
    ItemBaseID: DataTypes.INTEGER
  }, {});
  Item.associate = function (models) {
    Item.belongsTo(models.Character);
    Item.belongsTo(models.ItemBase);
  };
  return Item;
};