import person from "./person.model";
import transaction from "./transaction.model";
import debtor from "./debtor.model";
import userGroup from "./userGroup.model";
import groupUser from "./group_user.model";
import seq from "./connection";

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
