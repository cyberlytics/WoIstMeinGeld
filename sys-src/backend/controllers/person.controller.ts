import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { IPerson, PersonService } from "../authentication/person.service";
import db from "../models";

const Person = db.persons;

export class PersonsController {
    public create(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }

        const { name, password } = req.body;

        if (!name || !password) {
            res.status(400).send({
                message: "Content can not be empty!",
            });
            return;
        }

        Person.create({
            name: name,
            password: password,
        })
            .then((d) => {
                res.send(d);
            })
            .catch((e) => {
                res.status(500).send({
                    message: e.message || "Error occured on creating person.",
                });
            });
    }
    public getAll(req, res) {}
    public getGroups(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        PersonService.getIdAndNameFromToken(req.cookies.token).then((value: IPerson) => {
            if (value !== undefined) {
                const personId = value.id;
                Person.findByPk(personId, {
                    include: { model: db.usergroups, attributes: ["id", "name"] },
                })
                    .then((t: any) => {
                        const ret = [];
                        t.usergroups.forEach((element) => {
                            ret.push(element.dataValues);
                        });
                        res.send(ret);
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

    public getId(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        PersonService.getIdAndNameFromToken(req.cookies.token).then((value: IPerson) => {
            if (value !== undefined) {
                const personId = value.id;
                Person.findByPk(personId, {})
                    .then((t: any) => {
                        const ret = t.dataValues.id;
                        res.send(ret.toString());
                    })
                    .catch((e) => {
                        console.log(e);
                        res.status(500).send({
                            message: e.message || "Error occurred on finding Person.",
                        });
                    });
            }
        });
    }
}

export default PersonsController;
