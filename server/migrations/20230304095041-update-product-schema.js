'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Change the data type of the `categories` column from enum to string
    await queryInterface.changeColumn('products', 'category', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'misc'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the data type of the `categories` column back to enum
    await queryInterface.changeColumn('products', 'category', {
      type: Sequelize.ENUM('electronics', 'books', 'misc'),
      allowNull: false,
      defaultValue: 'misc'
    });
  }
};
