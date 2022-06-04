import { Sequelize } from "sequelize";
import dbCfg from "../config/db.config";
import person from "./person.model";
import transaction from "./transaction.model";
import debtor from "./debtor.model";
import userGroup from "./userGroup.model";
import groupUser from "./group_user.model";

const seq = new Sequelize(dbCfg.DB, dbCfg.USER, dbCfg.PASSWORD, {
    host: dbCfg.HOST,
    port: Number(dbCfg.PORT) || 3306,
    pool: dbCfg.pool,
    dialect: "mysql",
});

const persons = person(seq);
const transactions = transaction(seq);
// define relationships
const debtors = debtor(seq, persons, transactions);
const usergroups = userGroup(seq);

const group_users = groupUser(seq, persons, usergroups);

persons.hasMany(transactions, { as: "creditor", foreignKey: "creditor_id" });
transactions.belongsTo(persons, { as: "creditor", foreignKey: "creditor_id" });

const db = {
    sequelize: seq,
    persons,
    transactions,
    debtors,
    usergroups,
    group_users,
};

export default db;
