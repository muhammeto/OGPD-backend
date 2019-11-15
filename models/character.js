'use strict';
module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    Name: DataTypes.STRING,
    Class: DataTypes.STRING,
    Level: DataTypes.INTEGER,
    AccountID: DataTypes.INTEGER,
    ClanID: DataTypes.INTEGER,
    NationID: DataTypes.INTEGER
  }, {});
  Character.associate = function (models) {
    Character.hasMany(models.Item);
    Character.belongsTo(models.Account);
    Character.belongsTo(models.Nation);
  };
  return Character;
};