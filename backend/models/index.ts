import { Sequelize } from "sequelize";
import dbCfg from "../config/db.config";
import person from "./person.model";
import transaction from "./transaction.model";

const seq = new Sequelize(dbCfg.DB, dbCfg.USER, dbCfg.PASSWORD, {
    host: dbCfg.HOST,
    port: Number(dbCfg.PORT) || 3306,
    pool: dbCfg.pool,
    dialect: "mysql",
});

const db = {
    sequelize: seq,
    persons: person(seq),
    transactions: transaction(seq),
};

export default db;
