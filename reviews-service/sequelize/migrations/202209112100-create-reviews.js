module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("reviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      },
      title: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      score: {
        allowNull: false,
        type: Sequelize.DataTypes.DECIMAL,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("reviews");
  },
};
