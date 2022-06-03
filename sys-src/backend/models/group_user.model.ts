import { ModelCtor, Sequelize } from "sequelize/types";
import { PersonModel } from "./person.model";
import { GroupModel } from "./group.model";

export default (seq: Sequelize, persons: ModelCtor<PersonModel>, groups: ModelCtor<GroupModel>) => {
    const GroupUser = seq.define("group_users", {}, { timestamps: false, freezeTableName: true });
    persons.belongsToMany(groups, {
        through: GroupUser,
        foreignKey: "person_id",
    });
    groups.belongsToMany(persons, {
        through: GroupUser,
        as: "group_users",
        foreignKey: "id",
    });
    return GroupUser;
};
