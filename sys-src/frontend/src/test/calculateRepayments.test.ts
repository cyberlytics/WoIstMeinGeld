import { calculateRepayments } from "../calculateRepayments";
import { Person } from "../models/Person";
import { Repayment } from "../models/Repayment";
import { Transaction } from "../models/Transaction";

const people: Person[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "Dave" },
];

const aliceTransaction: Transaction = {
    id: 1,
    group_id: 1,
    description: "description",
    creditor_id: 1, // Alice
    amount: 0,
    time: "2022-06-15 12:00:00",
    creditor: people[0], // Alice
    debtors: [], // nobody
};

describe("calculateRepayments", () => {
    test("[1] no transactions", () => {
        let noTransactions: Transaction[] = [];

        let repayments: Repayment[] = calculateRepayments(noTransactions);

        expect(repayments).toHaveLength(0);
    });
    test("[2] one transaction without debtors", () => {
        let oneTransaction: Transaction[] = [
            {
                ...aliceTransaction,
                description: "Alice lost a five euro bill.",
                amount: 5,
            },
        ];

        let repayments: Repayment[] = calculateRepayments(oneTransaction);

        expect(repayments).toHaveLength(0);
    });
    test("[3] one transaction where the creditor is the only debtor", () => {
        let oneTransaction: Transaction[] = [
            {
                ...aliceTransaction,
                description: "Alice bought something just for her.",
                amount: 5,
                debtors: people.slice(0, 1), // Alice
            },
        ];

        let repayments: Repayment[] = calculateRepayments(oneTransaction);

        expect(repayments).toHaveLength(0);
    });
    test("[4] one small transaction (0.03€)", () => {
        let oneTransaction: Transaction[] = [
            {
                ...aliceTransaction,
                description: "Alice lent three cent to Bob and Charlie.",
                amount: 0.03,
                debtors: people.slice(1, 3), // Bob, Charlie
            },
        ];

        let repayments: Repayment[] = calculateRepayments(oneTransaction);

        expect(repayments).toHaveLength(0);
    });
    test("[5] one small transaction (0.04€)", () => {
        let oneTransaction: Transaction[] = [
            {
                ...aliceTransaction,
                description: "Alice lent four cent to Bob and Charlie.",
                amount: 0.04,
                debtors: people.slice(1, 3), // Bob, Charlie
            },
        ];

        let repayments: Repayment[] = calculateRepayments(oneTransaction);

        let repaymentFromIds: number[] = repayments.map((repayment) => repayment.from.id);
        let repaymentToIds: number[] = repayments.map((repayment) => repayment.to.id);
        let repaymentAmounts: number[] = repayments.map((repayment) => repayment.amount);

        expect(repaymentFromIds).toEqual([2, 3]);
        expect(repaymentToIds).toEqual([1, 1]);
        expect(repaymentAmounts).toEqual([0.02, 0.02]);
    });
    test("[6] one small transaction (0.05€)", () => {
        let oneTransaction: Transaction[] = [
            {
                ...aliceTransaction,
                description: "Alice lent five cent to Bob and Charlie.",
                amount: 0.05,
                debtors: people.slice(1, 3), // Bob, Charlie
            },
        ];

        let repayments: Repayment[] = calculateRepayments(oneTransaction);

        let repaymentFromIds: number[] = repayments.map((repayment) => repayment.from.id);
        let repaymentToIds: number[] = repayments.map((repayment) => repayment.to.id);
        let repaymentAmounts: number[] = repayments.map((repayment) => repayment.amount);

        expect(repaymentFromIds).toEqual([2, 3]);
        expect(repaymentToIds).toEqual([1, 1]);
        expect(repaymentAmounts).toEqual([0.03, 0.02]);
    });
    test("[7] one normal transaction (1€)", () => {
        let oneTransaction: Transaction[] = [
            {
                ...aliceTransaction,
                description: "Alice lent one euro to Bob, Charlie and Dave.",
                amount: 1,
                debtors: people.slice(1), // Bob, Charlie, Dave
            },
        ];

        let repayments: Repayment[] = calculateRepayments(oneTransaction);

        let repaymentFromIds: number[] = repayments.map((repayment) => repayment.from.id);
        let repaymentToIds: number[] = repayments.map((repayment) => repayment.to.id);
        let repaymentAmounts: number[] = repayments.map((repayment) => repayment.amount);

        expect(repaymentFromIds).toEqual([2, 3, 4]);
        expect(repaymentToIds).toEqual([1, 1, 1]);
        expect(repaymentAmounts).toEqual([0.33, 0.33, 0.34]);
    });
    test("[8] one normal transaction (1€)", () => {
        let oneTransaction: Transaction[] = [
            {
                ...aliceTransaction,
                description: "Alice spent one euro for everybody.",
                amount: 1,
                debtors: people, // Alice, Bob, Charlie, Dave
            },
        ];

        let repayments: Repayment[] = calculateRepayments(oneTransaction);

        let repaymentFromIds: number[] = repayments.map((repayment) => repayment.from.id);
        let repaymentToIds: number[] = repayments.map((repayment) => repayment.to.id);
        let repaymentAmounts: number[] = repayments.map((repayment) => repayment.amount);

        expect(repaymentFromIds).toEqual([2, 3, 4]);
        expect(repaymentToIds).toEqual([1, 1, 1]);
        expect(repaymentAmounts).toEqual([0.25, 0.25, 0.25]);
    });
    test("[9] one normal transaction (2€)", () => {
        let oneTransaction: Transaction[] = [
            {
                ...aliceTransaction,
                description: "Alice lent two euro to Bob, Charlie and Dave.",
                amount: 2,
                debtors: people.slice(1), // Bob, Charlie, Dave
            },
        ];

        let repayments: Repayment[] = calculateRepayments(oneTransaction);

        let repaymentFromIds: number[] = repayments.map((repayment) => repayment.from.id);
        let repaymentToIds: number[] = repayments.map((repayment) => repayment.to.id);
        let repaymentAmounts: number[] = repayments.map((repayment) => repayment.amount);

        expect(repaymentFromIds).toEqual([2, 3, 4]);
        expect(repaymentToIds).toEqual([1, 1, 1]);
        expect(repaymentAmounts).toEqual([0.67, 0.67, 0.66]);
    });
    test("[10] one normal transaction (2€)", () => {
        let oneTransaction: Transaction[] = [
            {
                ...aliceTransaction,
                description: "Alice spent two euro for everybody.",
                amount: 2,
                debtors: people, // Alice, Bob, Charlie, Dave
            },
        ];

        let repayments: Repayment[] = calculateRepayments(oneTransaction);

        let repaymentFromIds: number[] = repayments.map((repayment) => repayment.from.id);
        let repaymentToIds: number[] = repayments.map((repayment) => repayment.to.id);
        let repaymentAmounts: number[] = repayments.map((repayment) => repayment.amount);

        expect(repaymentFromIds).toEqual([2, 3, 4]);
        expect(repaymentToIds).toEqual([1, 1, 1]);
        expect(repaymentAmounts).toEqual([0.5, 0.5, 0.5]);
    });
    test("[11] four normal transactions (1€, 2€, 3€, 4€)", () => {
        let fourTransactions: Transaction[] = [
            {
                id: 1,
                group_id: 1,
                description: "Alice spent one euro for everybody.",
                creditor_id: 1, // Alice
                amount: 1,
                time: "2022-06-01 12:00:00",
                creditor: people[0], // Alice
                debtors: people, // Alice, Bob, Charlie, Dave
            },
            {
                id: 2,
                group_id: 1,
                description: "Bob spent two euro for everybody.",
                creditor_id: 2, // Bob
                amount: 2,
                time: "2022-06-02 12:00:00",
                creditor: people[1], // Bob
                debtors: people, // Alice, Bob, Charlie, Dave
            },
            {
                id: 3,
                group_id: 1,
                description: "Charlie spent three euro for everybody.",
                creditor_id: 3, // Charlie
                amount: 3,
                time: "2022-06-03 12:00:00",
                creditor: people[2], // Charlie
                debtors: people, // Alice, Bob, Charlie, Dave
            },
            {
                id: 4,
                group_id: 1,
                description: "Dave spent four euro for everybody.",
                creditor_id: 4, // Dave
                amount: 4,
                time: "2022-06-03 12:00:00",
                creditor: people[3], // Dave
                debtors: people, // Alice, Bob, Charlie, Dave
            },
        ];

        let repayments: Repayment[] = calculateRepayments(fourTransactions);

        let repaymentFromIds: number[] = repayments.map((repayment) => repayment.from.id);
        let repaymentToIds: number[] = repayments.map((repayment) => repayment.to.id);
        let repaymentAmounts: number[] = repayments.map((repayment) => repayment.amount);

        expect(repaymentFromIds).toEqual([1, 2]);
        expect(repaymentToIds).toEqual([4, 3]);
        expect(repaymentAmounts).toEqual([1.5, 0.5]);
    });
    test("[12] four small transactions (0.01€, 0.01€, 0.01€, 0.01€)", () => {
        let fourTransactions: Transaction[] = [
            {
                id: 1,
                group_id: 1,
                description: "Alice lent one cent to Bob and Charlie.",
                creditor_id: 1, // Alice
                amount: 0.01,
                time: "2022-06-01 12:00:00",
                creditor: people[0], // Alice
                debtors: people.slice(1, 3), // Bob, Charlie
            },
            {
                id: 2,
                group_id: 1,
                description: "Alice lent one cent to Bob and Charlie.",
                creditor_id: 1, // Alice
                amount: 0.01,
                time: "2022-06-01 12:00:00",
                creditor: people[0], // Alice
                debtors: people.slice(1, 3), // Bob, Charlie
            },
            {
                id: 3,
                group_id: 1,
                description: "Alice lent one cent to Bob and Charlie.",
                creditor_id: 1, // Alice
                amount: 0.01,
                time: "2022-06-01 12:00:00",
                creditor: people[0], // Alice
                debtors: people.slice(1, 3), // Bob, Charlie
            },
            {
                id: 4,
                group_id: 1,
                description: "Alice lent one cent to Bob and Charlie.",
                creditor_id: 1, // Alice
                amount: 0.01,
                time: "2022-06-01 12:00:00",
                creditor: people[0], // Alice
                debtors: people.slice(1, 3), // Bob, Charlie
            },
        ];

        let repayments: Repayment[] = calculateRepayments(fourTransactions);

        let repaymentFromIds: number[] = repayments.map((repayment) => repayment.from.id);
        let repaymentToIds: number[] = repayments.map((repayment) => repayment.to.id);
        let repaymentAmounts: number[] = repayments.map((repayment) => repayment.amount);

        expect(repaymentFromIds).toEqual([2, 3]);
        expect(repaymentToIds).toEqual([1, 1]);
        expect(repaymentAmounts).toEqual([0.02, 0.02]);
    });
});
