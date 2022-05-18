import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import db from "../models";
import { PersonAddModel } from "../models/person.model";

const Person = db.persons;

export class PersonsController {
    public create(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }

        const { name } = req.body;

        if (!name) {
            res.status(400).send({
                message: "Content can not be empty!",
            });
            return;
        }

        Person.create({
            name: name,
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
}

export default PersonsController;
