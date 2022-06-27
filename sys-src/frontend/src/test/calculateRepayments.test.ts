import { calculateRepayments } from "../calculateRepayments";
import { Person } from "../models/Person";
import { Repayment } from "../models/Repayment";
import { Transaction } from "../models/Transaction";

const alice: Person = {
    id: 1,
    name: "Alice",
};

const bob: Person = {
    id: 2,
    name: "Bob",
};

const charlie: Person = {
    id: 3,
    name: "Charlie",
};

const dave: Person = {
    id: 4,
    name: "Dave",
};

function createTransaction(
    id: number,
    group_id: number,
    description: string,
    creditor_id: number,
    amount: number,
    creditor: Person,
    debtors: Person[]
): Transaction {
    return {
        id: id,
        group_id: group_id,
        description: description,
        creditor_id: creditor_id,
        amount: amount,
        time: "2022-06-01 12:00:00",
        creditor: creditor,
        debtors: debtors,
    };
}

describe("calculateRepayments", () => {
    test("[1] no transactions", () => {
        let noTransactions: Transaction[] = [];

        let repayments: Repayment[] = calculateRepayments(noTransactions);

        expect(repayments).toHaveLength(0);
    });

    test("[2] one transaction without debtors", () => {
        let aliceTransaction = createTransaction(1, 1, "Alice lost a five euro bill.", 1, 5, alice, []);

        let oneTransaction: Transaction[] = [aliceTransaction];

        let repayments: Repayment[] = calculateRepayments(oneTransaction);

        expect(repayments).toHaveLength(0);
    });

    test("[3] one transaction where the creditor is the only debtor", () => {
        let aliceTransaction = createTransaction(1, 1, "Alice bought something just for her.", 1, 5, alice, [alice]);

        let oneTransaction: Transaction[] = [aliceTransaction];

        let repayments: Repayment[] = calculateRepayments(oneTransaction);

        expect(repayments).toHaveLength(0);
    });

    test("[4] one small transaction (0.03€)", () => {
        let aliceTransaction = createTransaction(1, 1, "Alice lent three cent to Bob and Charlie.", 1, 0.03, alice, [
            bob,
            charlie,
        ]);

        let oneTransaction: Transaction[] = [aliceTransaction];

        let repayments: Repayment[] = calculateRepayments(oneTransaction);

        expect(repayments).toHaveLength(0);
    });

    test("[5] one small transaction (0.04€)", () => {
        let aliceTransaction = createTransaction(1, 1, "Alice lent four cent to Bob and Charlie.", 1, 0.04, alice, [
            bob,
            charlie,
        ]);

        let oneTransaction: Transaction[] = [aliceTransaction];

        let repayments: Repayment[] = calculateRepayments(oneTransaction);

        let repaymentFromIds: number[] = repayments.map((repayment) => repayment.from.id);
        let repaymentToIds: number[] = repayments.map((repayment) => repayment.to.id);
        let repaymentAmounts: number[] = repayments.map((repayment) => repayment.amount);

        expect(repaymentFromIds).toEqual([2, 3]);
        expect(repaymentToIds).toEqual([1, 1]);
        expect(repaymentAmounts).toEqual([0.02, 0.02]);
    });

    test("[6] one small transaction (0.05€)", () => {
        let aliceTransaction = createTransaction(1, 1, "Alice lent five cent to Bob and Charlie.", 1, 0.05, alice, [
            bob,
            charlie,
        ]);

        let oneTransaction: Transaction[] = [aliceTransaction];

        let repayments: Repayment[] = calculateRepayments(oneTransaction);

        let repaymentFromIds: number[] = repayments.map((repayment) => repayment.from.id);
        let repaymentToIds: number[] = repayments.map((repayment) => repayment.to.id);
        let repaymentAmounts: number[] = repayments.map((repayment) => repayment.amount);

        expect(repaymentFromIds).toEqual([2, 3]);
        expect(repaymentToIds).toEqual([1, 1]);
        expect(repaymentAmounts).toEqual([0.03, 0.02]);
    });

    test("[7] one normal transaction (1€)", () => {
        let aliceTransaction = createTransaction(1, 1, "Alice lent one euro to Bob, Charlie and Dave.", 1, 1, alice, [
            bob,
            charlie,
            dave,
        ]);

        let oneTransaction: Transaction[] = [aliceTransaction];

        let repayments: Repayment[] = calculateRepayments(oneTransaction);

        let repaymentFromIds: number[] = repayments.map((repayment) => repayment.from.id);
        let repaymentToIds: number[] = repayments.map((repayment) => repayment.to.id);
        let repaymentAmounts: number[] = repayments.map((repayment) => repayment.amount);

        expect(repaymentFromIds).toEqual([2, 3, 4]);
        expect(repaymentToIds).toEqual([1, 1, 1]);
        expect(repaymentAmounts).toEqual([0.33, 0.33, 0.34]);
    });

    test("[8] one normal transaction (1€)", () => {
        let aliceTransaction = createTransaction(1, 1, "Alice spent one euro for everybody.", 1, 1, alice, [
            alice,
            bob,
            charlie,
            dave,
        ]);

        let oneTransaction: Transaction[] = [aliceTransaction];

        let repayments: Repayment[] = calculateRepayments(oneTransaction);

        let repaymentFromIds: number[] = repayments.map((repayment) => repayment.from.id);
        let repaymentToIds: number[] = repayments.map((repayment) => repayment.to.id);
        let repaymentAmounts: number[] = repayments.map((repayment) => repayment.amount);

        expect(repaymentFromIds).toEqual([2, 3, 4]);
        expect(repaymentToIds).toEqual([1, 1, 1]);
        expect(repaymentAmounts).toEqual([0.25, 0.25, 0.25]);
    });

    test("[9] one normal transaction (2€)", () => {
        let aliceTransaction = createTransaction(1, 1, "Alice lent two euro to Bob, Charlie and Dave.", 1, 2, alice, [
            bob,
            charlie,
            dave,
        ]);

        let oneTransaction: Transaction[] = [aliceTransaction];

        let repayments: Repayment[] = calculateRepayments(oneTransaction);

        let repaymentFromIds: number[] = repayments.map((repayment) => repayment.from.id);
        let repaymentToIds: number[] = repayments.map((repayment) => repayment.to.id);
        let repaymentAmounts: number[] = repayments.map((repayment) => repayment.amount);

        expect(repaymentFromIds).toEqual([2, 3, 4]);
        expect(repaymentToIds).toEqual([1, 1, 1]);
        expect(repaymentAmounts).toEqual([0.67, 0.67, 0.66]);
    });

    test("[10] one normal transaction (2€)", () => {
        let aliceTransaction = createTransaction(1, 1, "Alice spent two euro for everybody.", 1, 2, alice, [
            alice,
            bob,
            charlie,
            dave,
        ]);

        let oneTransaction: Transaction[] = [aliceTransaction];

        let repayments: Repayment[] = calculateRepayments(oneTransaction);

        let repaymentFromIds: number[] = repayments.map((repayment) => repayment.from.id);
        let repaymentToIds: number[] = repayments.map((repayment) => repayment.to.id);
        let repaymentAmounts: number[] = repayments.map((repayment) => repayment.amount);

        expect(repaymentFromIds).toEqual([2, 3, 4]);
        expect(repaymentToIds).toEqual([1, 1, 1]);
        expect(repaymentAmounts).toEqual([0.5, 0.5, 0.5]);
    });

    test("[11] four normal transactions (1€, 2€, 3€, 4€)", () => {
        let aliceTransaction = createTransaction(1, 1, "Alice spent one euro for everybody.", 1, 1, alice, [
            alice,
            bob,
            charlie,
            dave,
        ]);

        let bobTransaction = createTransaction(2, 1, "Bob spent two euro for everybody.", 2, 2, bob, [
            alice,
            bob,
            charlie,
            dave,
        ]);

        let charlieTransaction = createTransaction(3, 1, "Charlie spent three euro for everybody.", 3, 3, charlie, [
            alice,
            bob,
            charlie,
            dave,
        ]);

        let daveTransaction = createTransaction(4, 1, "Dave spent four euro for everybody.", 4, 4, dave, [
            alice,
            bob,
            charlie,
            dave,
        ]);

        let fourTransactions: Transaction[] = [aliceTransaction, bobTransaction, charlieTransaction, daveTransaction];

        let repayments: Repayment[] = calculateRepayments(fourTransactions);

        let repaymentFromIds: number[] = repayments.map((repayment) => repayment.from.id);
        let repaymentToIds: number[] = repayments.map((repayment) => repayment.to.id);
        let repaymentAmounts: number[] = repayments.map((repayment) => repayment.amount);

        expect(repaymentFromIds).toEqual([1, 2]);
        expect(repaymentToIds).toEqual([4, 3]);
        expect(repaymentAmounts).toEqual([1.5, 0.5]);
    });

    test("[12] four normal transactions (4€, 3€, 2€, 1€)", () => {
        let aliceTransaction = createTransaction(1, 1, "Alice spent four euro for everybody.", 1, 4, alice, [
            alice,
            bob,
            charlie,
            dave,
        ]);

        let bobTransaction = createTransaction(2, 1, "Bob spent three euro for everybody.", 2, 3, bob, [
            alice,
            bob,
            charlie,
            dave,
        ]);

        let charlieTransaction = createTransaction(3, 1, "Charlie spent two euro for everybody.", 3, 2, charlie, [
            alice,
            bob,
            charlie,
            dave,
        ]);

        let daveTransaction = createTransaction(4, 1, "Dave spent one euro for everybody.", 4, 1, dave, [
            alice,
            bob,
            charlie,
            dave,
        ]);

        let fourTransactions: Transaction[] = [aliceTransaction, bobTransaction, charlieTransaction, daveTransaction];

        let repayments: Repayment[] = calculateRepayments(fourTransactions);

        let repaymentFromIds: number[] = repayments.map((repayment) => repayment.from.id);
        let repaymentToIds: number[] = repayments.map((repayment) => repayment.to.id);
        let repaymentAmounts: number[] = repayments.map((repayment) => repayment.amount);

        expect(repaymentFromIds).toEqual([4, 3]);
        expect(repaymentToIds).toEqual([1, 2]);
        expect(repaymentAmounts).toEqual([1.5, 0.5]);
    });

    test("[13] four small transactions (0.01€, 0.01€, 0.01€, 0.01€)", () => {
        let aliceTransaction = createTransaction(1, 1, "Alice lent one cent to Bob and Charlie.", 1, 0.01, alice, [
            bob,
            charlie,
        ]);

        let fourTransactions: Transaction[] = [aliceTransaction, aliceTransaction, aliceTransaction, aliceTransaction];

        let repayments: Repayment[] = calculateRepayments(fourTransactions);

        let repaymentFromIds: number[] = repayments.map((repayment) => repayment.from.id);
        let repaymentToIds: number[] = repayments.map((repayment) => repayment.to.id);
        let repaymentAmounts: number[] = repayments.map((repayment) => repayment.amount);

        expect(repaymentFromIds).toEqual([2, 3]);
        expect(repaymentToIds).toEqual([1, 1]);
        expect(repaymentAmounts).toEqual([0.02, 0.02]);
    });
});
