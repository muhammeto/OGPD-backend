'use strict';
module.exports = (sequelize, DataTypes) => {
  const Clan = sequelize.define('Clan', {
    Name: DataTypes.STRING,
    NationID: DataTypes.INTEGER
  }, {});
  Clan.associate = function (models) {
    Clan.hasMany(models.Character);
    Clan.belongsTo(models.Nation);
  };
  return Clan;
};