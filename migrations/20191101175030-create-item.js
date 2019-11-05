'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Items', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      CharacterID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'characters',
          key: 'id'
        }
      },
      Level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
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
    return queryInterface.dropTable('Items');
  }
};