import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../../connection.mjs";

class Users extends Sequelize.Model { }

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    given_name: DataTypes.STRING,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    session: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false
    },
    locale: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    sub: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: "users",
  }
);

Users.sync({ force: true, alter: true });

export default Users;
