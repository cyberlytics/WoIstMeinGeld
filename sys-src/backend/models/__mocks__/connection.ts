import { Sequelize } from "sequelize";

const connection = new Sequelize("sqlite::memory:", { dialect: "mysql" });

export default connection;
