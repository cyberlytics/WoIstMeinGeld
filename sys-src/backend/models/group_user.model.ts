import { ModelCtor, Sequelize } from "sequelize/types";
import { PersonModel } from "./person.model";
import { UserGroupModel } from "./userGroup.model";

export default (seq: Sequelize, persons: ModelCtor<PersonModel>, groups: ModelCtor<UserGroupModel>) => {
    const GroupUser = seq.define("group_users", {}, { timestamps: false, freezeTableName: true });
    persons.belongsToMany(groups, {
        through: GroupUser,
        foreignKey: "person_id",
    });
    groups.belongsToMany(persons, {
        through: GroupUser,
        as: "groupToUser",
        foreignKey: "usergroup_id",
    });
    return GroupUser;
};
