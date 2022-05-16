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

        const payload = matchedData(req, {
            locations: ["query"],
        }) as PersonAddModel; // FIXME payload is empty but should contain query param
        // maybe because of type casting?
        // TODO: not sure if necessary might be checked by above already
        if (!payload.name) {
            res.status(400).send({
                message: "Content can not be empty!",
            });
            return;
        }

        Person.create({
            name: payload.name,
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
