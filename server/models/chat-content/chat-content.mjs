import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../../connection.mjs";

class ChatContent extends Sequelize.Model { }

ChatContent.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: DataTypes.INTEGER,
  chat_id: DataTypes.INTEGER,
  content: DataTypes.STRING,
},
  {
    sequelize,
    modelName: "chatContent"
  }
);

ChatContent.sync({ forse: true, alter: true });

export default ChatContent;