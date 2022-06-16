import { rest } from "msw";
import { Transaction } from "../models/Transaction";

// Mock Data
export const posts = [
  {
    userId: 1,
    id: 1,
    title: "first post title",
    body: "first post body",
  },
  {
    userId: 2,
    id: 5,
    title: "second post title",
    body: "second post body",
  },
  {
    userId: 3,
    id: 6,
    title: "third post title",
    body: "third post body",
  },
];

export const transactions = [{ "id": 1, "group_id": 3, "creditor_id": 1, "description": "Himbeeren", "time": "2022-05-22T12:00:00.000Z", "amount": 7, "createdAt": "2022-06-16T12:21:31.000Z", "updatedAt": "2022-06-16T12:21:31.000Z", "creditor": { "id": 1, "name": "Hans" }, "debtors": [{ "id": 2, "name": "Franz", "debtor": { "person_id": 2, "transaction_id": 1 } }, { "id": 3, "name": "Sepp", "debtor": { "person_id": 3, "transaction_id": 1 } }, { "id": 4, "name": "Dieter", "debtor": { "person_id": 4, "transaction_id": 1 } }] }]

interface AddTransaction {
  group_id: number;
  creditor_id: number;
  description: string;
  //** time in ISOString */
  time: string;
  amount: number;
  debtors: number[];
}

const payload: AddTransaction = {
  group_id: 1,
  creditor_id: 1,
  description: "test",
  time: new Date().toISOString(),
  amount: 5,
  debtors: [1],
};

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [
  rest.post("http://localhost:8080/createTransaction", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(payload));
  }),

  rest.get("http://localhost:8080/transactions/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(transactions));
  }),
  rest.delete("http://localhost:8080/deleteGroup", (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ Message: "Error occured on deleting transaction." }));
  }),
];
