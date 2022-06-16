import { rest } from "msw";
import { Group } from "../models/Group";
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

const groups: Group[] = [
    {
        id: 1,
        name: "Gruppe 1",
    },
    {
        id: 2,
        name: "Gruppe 2",
    },
    {
        id: 3,
        name: "Gruppe 3",
    },
];

const transactions: Transaction[] = [
    {
        id: 1,
        group_id: 1,
        description: "Bier",
        creditor_id: 1,
        amount: 10,
        time: "Sun May 22 2022 12:00:00 GMT+0200 (Central European Summer Time)",
        creditor: { id: 1, name: "Hans" },
        debtors: [
            { id: 1, name: "Hans" },
            { id: 2, name: "Franz" },
        ],
    },
];

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [
    rest.post("http://localhost:8080/createTransaction", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(payload));
    }),
    rest.get("http://localhost:8080/getGroups", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(groups));
    }),
    rest.get("http://localhost:8080/transactions/1", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(transactions));
    }),
];
