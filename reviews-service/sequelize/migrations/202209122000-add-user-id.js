module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "reviews",
      "user",
      Sequelize.DataTypes.INTEGER
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("reviews", "user");
  },
};
