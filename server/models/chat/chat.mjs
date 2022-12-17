import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../../connection.mjs";

class Chat extends Sequelize.Model { }

Chat.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_ids: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  }
},
  {
    sequelize,
    modelName: "chat"
  }
);

Chat.sync({ forse: true, alter: true });

export default Chat;