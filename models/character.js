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
  Character.associate = function(models) {
    // associations can be defined here
  };
  return Character;
};