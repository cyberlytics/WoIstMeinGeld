import { Request, Response } from "express";
import { Result, validationResult } from "express-validator";
import db from "../models";

const UserGroup = db.usergroups;

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

    static get userGroupAttributes() {
        return ["id", "name"];
    }

    public getGroups(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        const q = req.query;
        if (q.id) {
            let groupId = Number(q.id);
            UserGroup.findByPk(groupId, {
                include: { association: "group_users", attributes: ["usergroup_id"] },
                attributes: UserGroupController.userGroupAttributes,
            })
                .then((t: any) => {
                    res.send(t);
                })
                .catch((e) => {
                    res.status(500).send({
                        message: e.message || "Error occurred on finding group.",
                    });
                });
        }
    }
}
export default UserGroupController;
