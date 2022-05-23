import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import db from "../models";

const Transaction = db.transactions;

export class TransactionController {
    public findAll(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }

        Transaction.findAll()
            .then((d) => {
                res.send(d);
            })
            .catch((e) => {
                res.status(500).send({
                    message: e.message || "Error occured on creating person.",
                });
            });
    }
}

export default TransactionController;
