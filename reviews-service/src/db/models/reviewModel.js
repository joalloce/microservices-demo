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
  },
  { sequelize, modelName: "review" }
);
