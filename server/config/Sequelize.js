import {Sequelize} from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    logging: false,
    dialectOptions: {
      connectTimeout: 60000 // Increase timeout to 60 seconds
    }
  }
);