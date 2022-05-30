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

        Transaction.findAll({
            order: [["time", "DESC"]],
            include: [
                { association: "creditor", attributes: ["id", "name"] },
                { association: "debtors", attributes: ["id", "name"] },
            ],
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

    /**
     * createTransaction
     */
    public async createTransaction(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }

        const { group_id, creditor_id, description, time, amount, debtors } = req.body;

        const resWithError = (e: any) => res.status(422).send(e.message);

        Transaction.create({
            group_id,
            description,
            time: new Date(time).toISOString(),
            amount,
            creditor_id,
        })
            .then((t) => {
                t.addDebtors(debtors)
                    .then((t) => {
                        res.status(201).send();
                    })
                    .catch((e) => {
                        // TODO delete TransactionModel if debtor creation failed
                        // Transaction.destroy(t);
                        resWithError(e);
                    });
            })
            .catch(resWithError);
    }

    static get transactionAttributes() {
        return ["id", "amount", "time", "description"];
    }

    /**
     * getTransaction
     */
    public getTransaction(req: Request, res: Response) {
        // TODO refacture if needed or delete - it was implemented examplary
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        const q = req.query;
        if (q.transaction_id) {
            let transactionId = Number(q.transaction_id);
            Transaction.findByPk(transactionId, {
                include: { association: "debtors", attributes: ["id", "name"] },
                attributes: TransactionController.transactionAttributes,
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

export default TransactionController;
