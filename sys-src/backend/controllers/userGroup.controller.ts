import { Request, Response } from "express";
import { Result, validationResult } from "express-validator";
import { IPerson, PersonService } from "../authentication/person.service";
import db from "../models";

const Transaction = db.transactions;
const UserGroup = db.usergroups;
const GroupUser = db.group_users;

interface PersonData {
    id: number;
    name: string;
}

export class UserGroupController {
    public findAll(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        UserGroup.findAll({ order: ["name"], include: [{ association: "group_users", attributes: ["usergroup_id"] }] })
            .then((d) => {
                res.send(d);
            })
            .catch((e) => {
                res.status(500).send({ message: e.message || "Error occurred on finding group." });
            });
    }

    /**
     * createGroup
     */
    public async createGroup(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        const resultWithError = (e: any) => res.status(422).send(e.message);
        const { name } = req.body;
        PersonService.getIdAndNameFromToken(req.cookies.token).then((value: IPerson) => {
            if (value !== undefined) {
                const personId = value.id;
                UserGroup.create({
                    name,
                })
                    .then((t) => {
                        t.addGroupToUser([personId])
                            .then((t) => {
                                res.status(201).send();
                            })
                            .catch((e) => {
                                resultWithError(e);
                            });
                    })
                    .catch(resultWithError);
            }
        });
    }

    /**
     * add person to group
     */
    public async addToGroup(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        const resultWithError = (e: any) => res.status(422).send(e.message);
        const { id } = req.body;
        PersonService.getIdAndNameFromToken(req.cookies.token).then((value: IPerson) => {
            if (value !== undefined) {
                const personId = value.id;
                const groupId = Number(id);
                UserGroup.findByPk(groupId)
                    .then((t) => {
                        t.addGroupToUser([personId])
                            .then((t) => {
                                res.status(201).send();
                            })
                            .catch((e) => {
                                resultWithError(e);
                            });
                    })
                    .catch(resultWithError);
            }
        });
    }

    /**
     * remove person from group
     */
    public async removeFromGroup(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        const resultWithError = (e: any) => res.status(422).send(e.message);
        const { groupId } = req.body;
        PersonService.getIdAndNameFromToken(req.cookies.token).then((value: IPerson) => {
            if (value !== undefined) {
                const personId = value.id;
                UserGroup.findOne({
                    where: {
                        id: groupId,
                    },
                })
                    .then((t) => {
                        t.removeGroupToUser([personId])
                            .then((t) => {
                                res.status(201).send();
                            })
                            .catch((e) => {
                                resultWithError(e);
                            });
                    })
                    .catch(resultWithError);
            }
        });
    }

    /**
     * deleteGroup
     */
    public async deleteGroup(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        const { groupId } = req.body;
        console.log(groupId);

        if (groupId) {
            UserGroup.destroy({
                where: { id: groupId },
            })
                .then(async (t: any) => {

                    Transaction.destroy({
                        where: { group_id: Number(groupId) },
                    }).then((t: any) => {
                        res.status(200).send({ "number of deleted rows": t });
                    }).catch((e) => {
                        res.status(500).send({
                            message: e.message + groupId || "Error occured on deleting group.",
                        });
                    });

                })
                .catch((e) => {
                    res.status(500).send({
                        message: e.message || "Error occured on deleting group.",
                    });
                });
        }
    }

    public getGroupUsers(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        const { groupId } = req.params;
        const groupIdNum = Number(groupId);
        console.log(groupIdNum);

        UserGroup.findByPk(groupIdNum, {
            include: { model: db.persons, attributes: ["id", "name"], as: "groupToUser" },
        })
            .then((t: any) => {
                const ret: PersonData[] = [];
                t.dataValues.groupToUser.forEach((person) => {
                    const personData = person.dataValues;
                    const tempPerson: PersonData = {
                        id: personData.id,
                        name: personData.name,
                    };
                    ret.push(tempPerson);
                });

                res.send(ret);
            })
            .catch((e) => {
                console.log(e);
                res.status(500).send({
                    message: e.message || "Error occured on finding transactions.",
                });
            });
    }
}
export default UserGroupController;
