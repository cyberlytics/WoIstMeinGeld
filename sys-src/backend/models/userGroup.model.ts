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

export interface UserGroupModel
    extends Model<InferAttributes<UserGroupModel>, InferCreationAttributes<UserGroupModel>> {
    id: CreationOptional<number>;
    name: string;
    groupToUser: BelongsToManyHasAssociationMixin<PersonModel, number>;
    addGroupToUser: BelongsToManyAddAssociationsMixin<PersonModel, number>;
}

export default (seq: Sequelize) => {
    const UserGroup = seq.define<UserGroupModel>(
        "usergroup",
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
    return UserGroup;
};
