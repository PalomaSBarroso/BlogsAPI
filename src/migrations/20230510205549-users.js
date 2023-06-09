'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      displayName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'display_name'
      },

      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },

      password: {
        type: Sequelize.STRING,
      },

      image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('users');
  }
};