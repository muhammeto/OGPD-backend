'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Characters', {
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
      Class: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Level: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      AccountID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'accounts',
          key: 'id'
        }
      },
      ClanID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'clans',
          key: 'id'
        }
      },
      NationID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'nations',
          key: 'id'
        }
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
    return queryInterface.dropTable('Characters');
  }
};