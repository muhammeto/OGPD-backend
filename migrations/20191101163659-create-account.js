'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Accounts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      Password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      Role: {
        type: Sequelize.INTEGER,
        defaultValue: 1 // 0 = Admin 1 = player
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
      }, updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Accounts');
  }
};