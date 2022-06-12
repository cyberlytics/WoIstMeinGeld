import person from "./person.model";
import transaction from "./transaction.model";
import debtor from "./debtor.model";
import seq from "./connection";

const persons = person(seq);
const transactions = transaction(seq);
// define relationships
const debtors = debtor(seq, persons, transactions);

persons.hasMany(transactions, { as: "creditor", foreignKey: "creditor_id" });
transactions.belongsTo(persons, { as: "creditor", foreignKey: "creditor_id" });

const db = {
    sequelize: seq,
    persons,
    transactions,
    debtors,
};

export default db;
