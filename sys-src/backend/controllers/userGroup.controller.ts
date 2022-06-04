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

    static get userGroupAttributes() {
        return ["id", "name"];
    }

    public getGroups(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        PersonService.getIdAndNameFromToken(req.cookies.token).then((value: IPerson) => {
            if (value !== undefined) {
                const personId = value.id;
                GroupUser.findAll({ include: UserGroup })
                    .then((t: any) => {
                        console.log(t);
                        res.send(t);
                    })
                    .catch((e) => {
                        console.log(e);
                        res.status(500).send({
                            message: e.message || "Error occurred on finding group.",
                        });
                    });
            }
        });
    }
}
export default UserGroupController;
