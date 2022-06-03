import {
    Sequelize,
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    BelongsToManyHasAssociationMixin,
    BelongsToManyAddAssociationsMixin,
} from "sequelize";
import { PersonModel } from "./person.model";

export interface GroupModel extends Model<InferAttributes<GroupModel>, InferCreationAttributes<GroupModel>> {
    id: CreationOptional<number>;
    name: string;
    group_users: BelongsToManyHasAssociationMixin<PersonModel, number>;
    addGroupUser: BelongsToManyAddAssociationsMixin<PersonModel, number>;
}

export default (seq: Sequelize) => {
    const Group = seq.define<GroupModel>(
        "transaction",
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(100),
            },
        },
        { freezeTableName: true }
    );
    return Group;
};
