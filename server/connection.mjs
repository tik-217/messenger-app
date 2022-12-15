import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "template1",
  "tigrangabulan",
  "rootroot",
  {
    dialect: 'postgres',
    port: 5438,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
)

sequelize
  .authenticate()
  .then(() => console.log('Connected.'))
  .catch((err) => console.error('Connection error: ', err))

export default sequelize;