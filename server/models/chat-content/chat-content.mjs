import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../../connection.mjs";

class ChatContent extends Sequelize.Model { }

ChatContent.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  chat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {
    sequelize,
    modelName: "chatContent"
  }
);

ChatContent.sync({ forse: true, alter: true });

export default ChatContent;