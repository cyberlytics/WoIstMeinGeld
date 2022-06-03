import { Request, Response } from "express";
import { Result, validationResult } from "express-validator";
import db from "../models";

const Group = db.groups;

export class GroupController {
    public findAll(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        Group.findAll({ order: ["name"], include: [{ association: "group_users", attributes: ["group_id"] }] })
            .then((d) => {
                res.send(d);
            })
            .catch((e) => {
                res.status(500).send({ message: e.message || "Error occurred on finding group." });
            });
    }

    static get groupAttributes() {
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
            Group.findByPk(groupId, {
                include: { association: "group_users", attributes: ["group_id"] },
                attributes: GroupController.groupAttributes,
            })
                .then((t: any) => {
                    res.send(t);
                })
                .catch((e) => {
                    res.status(500).send({
                        message: e.message || "Error occured on creating person.",
                    });
                });
        }
    }
}
export default GroupController;
