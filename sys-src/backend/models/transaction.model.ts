/**
 * This is the ts counterpart to the sql table transaction
 */
import {
    Sequelize,
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyHasAssociationMixin,
} from "sequelize";
import { PersonModel } from "./person.model";

export interface TransactionModel
    extends Model<InferAttributes<TransactionModel>, InferCreationAttributes<TransactionModel>> {
    id: CreationOptional<number>;
    group_id: number;
    creditor_id: number;
    description: string;
    time: string;
    amount: number;
    // virtual associations for TS
    debtors: BelongsToManyHasAssociationMixin<PersonModel, number>;
    addDebtors: BelongsToManyAddAssociationsMixin<PersonModel, number>;
}

export default (seq: Sequelize) => {
    const Transaction = seq.define<TransactionModel>(
        "transaction",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            group_id: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            creditor_id: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            description: {
                type: DataTypes.STRING(100),
            },
            time: {
                type: DataTypes.DATE,
            },
            amount: {
                type: DataTypes.FLOAT,
            },
        },
        { freezeTableName: true }
    );
    return Transaction;
};
