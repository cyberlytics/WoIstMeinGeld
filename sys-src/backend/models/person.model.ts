/**
 * This is the ts counterpart to the sql table person
 */
import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

// TODO consider if reuse of some of these Interfaces in frontend would be usefull
// https://stackoverflow.com/questions/53138659/typescript-reuse-of-interfaces-and-classes-for-frontend-angular-and-backend

export interface PersonAddModel {
    name: string;
    password: string;
}

export interface PersonModel extends Model<InferAttributes<PersonModel>, InferCreationAttributes<PersonModel>> {
    id: CreationOptional<number>;
    name: string;
    password: string;
}

export default (seq: Sequelize) => {
    // FIXME this define creates a sql table named people ?!
    // table should obviously match up with predefined in <rootdir>/db/schema.sql
    const Person = seq.define<PersonModel>(
        "person",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(100),
            },
            password: {
                type: DataTypes.STRING(64),
            },
        },
        { freezeTableName: true }
    );
    return Person;
};
