import { Request, Response } from "express";
import { Result, validationResult } from "express-validator";
import { IPerson, PersonService } from "../authentication/person.service";
import db from "../models";

const UserGroup = db.usergroups;
const GroupUser = db.group_users;

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

    public async createGroup(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        const resultWithError = (e: any) => res.status(422).send(e.message);
        const { name, creator_id } = req.body;
        UserGroup.create({
            name,
        })
            .then((t) => {
                t.addGroupToUser(creator_id)
                    .then((t) => {
                        res.status(201).send();
                    })
                    .catch((e) => {
                        resultWithError(e);
                    });
            })
            .catch(resultWithError);
    }

    public async addToGroup(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        const resultWithError = (e: any) => res.status(422).send(e.message);
        const { name } = req.body;
        PersonService.getIdAndNameFromToken(req.cookies.token).then((value: IPerson) => {
            if (value !== undefined) {
                const personId = value.id;
                UserGroup.findOne({
                    where: {
                        name: name,
                    },
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
}
export default UserGroupController;
