import { ModelCtor, Sequelize } from "sequelize/types";
import { PersonModel } from "./person.model";
import { TransactionModel } from "./transaction.model";

export default (seq: Sequelize, persons: ModelCtor<PersonModel>, transactions: ModelCtor<TransactionModel>) => {
    const Debtor = seq.define("debtor", {}, { timestamps: false, freezeTableName: true });
    persons.belongsToMany(transactions, {
        through: Debtor,
        foreignKey: "person_id",
    });
    transactions.belongsToMany(persons, {
        through: Debtor,
        as: "debtors", // necessary to access debor via eager loading
        foreignKey: "transaction_id",
    });
    return Debtor;
};
