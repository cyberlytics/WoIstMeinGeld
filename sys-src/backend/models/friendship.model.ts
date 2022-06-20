/**
 * This is the ts counterpart to the friendship table person
 */
import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";

interface FriendshipModel extends Model<InferAttributes<FriendshipModel>, InferCreationAttributes<FriendshipModel>> {
    person1ID: number;
    person2ID: number;
}

export default (seq: Sequelize) => {
    const Friendship = seq.define<FriendshipModel>(
        "friendship",
        {
            person1ID: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
            },
            person2ID: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
            },
        },
        { freezeTableName: true }
    );
    return Friendship;
};
