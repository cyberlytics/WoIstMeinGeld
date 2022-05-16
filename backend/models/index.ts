import { Sequelize } from "sequelize";
import dbCfg from "../config/db.config";
import person from "./person.model";
import friendship from "./friendship.model";

const seq = new Sequelize(dbCfg.DB, dbCfg.USER, dbCfg.PASSWORD, {
    host: dbCfg.HOST,
    pool: dbCfg.pool,
    dialect: "mysql",
});

const db = {
    sequelize: seq,
    persons: person(seq),
    friendships: friendship(seq),
};

export default db;
