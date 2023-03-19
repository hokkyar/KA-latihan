'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'catId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'categories',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'catId')
  }
};
