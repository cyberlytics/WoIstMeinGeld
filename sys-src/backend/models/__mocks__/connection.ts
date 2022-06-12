// Try to mock Database connection
import { Sequelize } from "sequelize";

console.log("hi");

const connection = new Sequelize({ dialect: "mysql" });

export default connection;
