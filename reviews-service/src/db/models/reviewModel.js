import { DataTypes, Model } from "sequelize";

import sequelize from "#root/db/connection";

export class Review extends Model {}

Review.init(
  {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    score: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    user: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: "review" }
);
