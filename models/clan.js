'use strict';
module.exports = (sequelize, DataTypes) => {
  const Clan = sequelize.define('Clan', {
    Name: DataTypes.STRING,
    NationID: DataTypes.INTEGER
  }, {});
  Clan.associate = function(models) {
    // associations can be defined here
  };
  return Clan;
};