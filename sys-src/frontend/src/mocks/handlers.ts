import { rest } from "msw";
import { Group } from "../models/Group";
import { Person } from "../models/Person";

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

export const transactions = [
    {
        id: 1,
        group_id: 3,
        creditor_id: 1,
        description: "Himbeeren",
        time: "2022-05-22T12:00:00.000Z",
        amount: 7,
        createdAt: "2022-06-16T12:21:31.000Z",
        updatedAt: "2022-06-16T12:21:31.000Z",
        creditor: { id: 2, name: "Franz" },
        debtors: [
            { id: 2, name: "Franz", debtor: { person_id: 2, transaction_id: 1 } },
            { id: 3, name: "Sepp", debtor: { person_id: 3, transaction_id: 1 } },
            { id: 4, name: "Dieter", debtor: { person_id: 4, transaction_id: 1 } },
        ],
    },
];

export const closedTransactions = [
    {
        id: 1,
        group_id: 3,
        creditor_id: 1,
        description: "Bananen",
        time: "2022-05-22T12:00:00.000Z",
        amount: 2,
        createdAt: "2022-06-16T12:21:31.000Z",
        updatedAt: "2022-06-16T12:21:31.000Z",
        creditor: { id: 1, name: "Hans" },
        debtors: [{ id: 2, name: "Franz", debtor: { person_id: 2, transaction_id: 1 } }],
    },
    {
        id: 2,
        group_id: 3,
        creditor_id: 1,
        description: "Bananen",
        time: "2022-05-22T12:00:00.000Z",
        amount: 2,
        createdAt: "2022-06-16T12:21:31.000Z",
        updatedAt: "2022-06-16T12:21:31.000Z",
        creditor: { id: 2, name: "Franz" },
        debtors: [{ id: 1, name: "Hans", debtor: { person_id: 1, transaction_id: 2 } }],
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

export const groups: Group[] = [
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

const groupUsers: Person[] = [
    {
        id: 1,
        name: "Hans",
    },
    {
        id: 2,
        name: "Franz",
    },
];

const signInOutResponseSucc = {
    token: "succToken",
};

// Define handlers that catch the corresponding requests and return the mock data.
export const handlers = [
    rest.post("http://localhost:8080/createTransaction", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(payload));
    }),
    rest.get("http://localhost:8080/transactions/1", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(transactions));
    }),
    rest.get("http://localhost:8080/transactions/2", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(closedTransactions));
    }),
    rest.get("http://localhost:8080/transactions/3", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
    }),
    rest.delete("http://localhost:8080/deleteTransaction", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({}));
    }),

    rest.get("http://localhost:8080/getGroups", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(groups));
    }),
    rest.get("http://localhost:8080/getGroupUsers/1", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(groupUsers));
    }),
    rest.get("http://localhost:8080/getGroupUsers/3", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(groupUsers));
    }),
    rest.delete("http://localhost:8080/deleteGroup", (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ Message: "Error occured on deleting group." }));
    }),
    rest.post("http://localhost:8080/removeFromGroup", (req, res, ctx) => {
        groups.shift();
        return res(ctx.status(200), ctx.json({}));
    }),

    rest.post("http://localhost:8080/signIn", (req: any, res, ctx) => {
        const { name, password } = req.body;

        if (name === "Franz" && password === "password") {
            return res(ctx.status(200), ctx.json({ 0: { msg: "successful login" } }));
        }
        if (name !== "Hans" && password === "password") {
            return res(ctx.status(200), ctx.json({ 0: { msg: "401 invalid password" } }));
        }
        if (password !== "password") {
            return res(ctx.status(200), ctx.json({ 0: { msg: "404 name doesn't exist" } }));
        }
        if (name === "Hans" && password === "password") {
            return res(ctx.status(200), ctx.json(signInOutResponseSucc));
        }
    }),
    rest.post("http://localhost:8080/signOut", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({}));
    }),
    rest.post("http://localhost:8080/signUp", (req: any, res, ctx) => {
        const { name } = req.body;

        if (name === "Albert") {
            return res(ctx.status(200), ctx.json({ 0: { msg: "successful signup" } }));
        }
        if (name === "Hans") {
            return res(ctx.status(200), ctx.json({ 0: { msg: "409 name already exists" } }));
        }

        return res(ctx.status(200), ctx.json(signInOutResponseSucc));
    }),
    rest.get("http://localhost:8080/getId", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json("1"));
    }),
];
