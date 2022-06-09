import { render } from "@testing-library/react";
import { calculateRepayments } from "../calculateRepayments";
import { Transaction } from "../models/Transaction";

describe("calculateRepayments", () => {
    test("empty transactions", () => {
        let emptyTransaction: Transaction[] = [];

        let repayments = calculateRepayments(emptyTransaction);

        expect(repayments).toHaveLength(0);
    });
});
