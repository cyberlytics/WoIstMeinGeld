import { rest } from "msw";
import { Group } from "../models/Group";

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

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [
    rest.post("http://localhost:8080/createTransaction", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(payload));
    }),
    rest.get("http://localhost:8080/getGroups", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(groups));
    }),
];
