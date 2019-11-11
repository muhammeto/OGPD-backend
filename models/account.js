'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    Name: DataTypes.STRING,
    Password: DataTypes.STRING,
    Email: DataTypes.STRING,
    Role: DataTypes.INTEGER
  }, {});
  Account.associate = function (models) {
    Account.hasMany(models.Character);
  };
  return Account;
};