import { Sequelize } from "sequelize";
import dbCfg from "../config/db.config";

const connection = new Sequelize(dbCfg.DB, dbCfg.USER, dbCfg.PASSWORD, {
    host: dbCfg.HOST,
    port: Number(dbCfg.PORT) || 3306,
    pool: dbCfg.pool,
    dialect: "mysql",
});

export default connection;
