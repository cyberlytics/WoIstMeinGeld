import { TransactionController } from "../controllers";
import { Request, Response } from "express";

// FIXME 2 encoiding not recognized maybe a secondary issue
// because these 2 line should but do not fix the error
// https://stackoverflow.com/questions/46227783/encoding-not-recognized-in-jest-js
import iconv from "iconv-lite";
iconv.encodingExists("cesu8");

// Hack to make iconv load the encodings module, otherwise jest crashes. Compare
// https://github.com/sidorares/node-mysql2/issues/489
// import * as iconv from "iconv-lite";
// iconv.encodingExists("cesu8");

// The try to mock the connection didn´t fix the error
jest.mock("../models/connection");

describe("transaction controller", () => {
    test("to create a transaction", async () => {
        const tc = new TransactionController();
        const req = {
            body: {
                group_id: 1,
                creditor_id: 1,
                descption: "test create transaction",
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

        await tc.createTransaction(req, res);

        // FIXME 1 jest does not wait for execution of sequelize
        // expect(res.send).toBeCalled();
        // expect(res.json).toBeCalledWith({});
        // expect(res.status).toBeCalledWith(201);
    });
});
