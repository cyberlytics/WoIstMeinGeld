import { Request, Response } from "express";
import { TransactionController } from "../controllers";

// FIXME Hack to make iconv load the encodings module. (does not appear to work)
// Compare https://github.com/sidorares/node-mysql2/issues/489
// import * as iconv from "iconv-lite";
// iconv.encodingExists("cesu8");

jest.useFakeTimers();
// mock the database connection to use in-memory db
jest.mock("../models/connection");

describe("transaction controller", () => {
    test("to create a transaction", async () => {
        const tc = new TransactionController();
        const req = {
            body: {
                group_id: 1,
                creditor_id: 1,
                description: "test create transaction",
                time: new Date().toISOString(),
                amount: 10,
                debtors: [1, 2, 3],
            },
        } as Request;
        const res = {
            status: jest.fn(),
            json: jest.fn(),
            send: jest.fn(),
        } as unknown as Response;

        const result = await tc.createTransaction(req, res);

        // FIXME 1 jest does not wait for execution of sequelize
        expect(res.send).toBeCalled();
        expect(res.json).toBeCalledWith({});
        expect(res.status).toBeCalledWith(201);
    });
});
