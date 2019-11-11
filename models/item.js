'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    Name: DataTypes.STRING,
    CharacterID: DataTypes.INTEGER,
    Level: DataTypes.INTEGER
  }, {});
  Item.associate = function (models) {
    Item.belongsTo(models.Character);
  };
  return Item;
};