import { vi } from "vitest";
import { render } from "@testing-library/react";
import { RepaymentList } from "../components/RepaymentList";
import { Transaction } from "../models/Transaction";
import { Person } from "../models/Person";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "@mui/material";
import theme from "../ThemeProvider";

const groupId = 1;

const personPeter: Person = {
    id: 1,
    name: "Peter",
};

const personPaul: Person = {
    id: 2,
    name: "Paul",
};

const personSandra: Person = {
    id: 3,
    name: "Sandra",
};

function createSampleTransaction(
    id: number,
    creditor: Person,
    description: string,
    amount: number,
    debtors: Person[]
): Transaction {
    return {
        id: id,
        group_id: groupId,
        creditor: creditor,
        creditor_id: creditor.id,
        description: description,
        amount: amount,
        time: "2020-01-01T00:00:00.000Z",
        debtors: debtors,
    };
}

const sampleTransactions: Transaction[] = [
    createSampleTransaction(1, personPeter, "Eis essen", 14, [personPaul, personSandra]),
    createSampleTransaction(2, personPeter, "Burger essen", 35, [personPaul, personSandra]),
    createSampleTransaction(3, personSandra, "Schlittschuh fahren", 11.5, [personPaul, personPeter]),
    createSampleTransaction(4, personPaul, "Museum", 10, [personSandra]),
    createSampleTransaction(5, personPeter, "Bierzelt", 40, [personPaul, personSandra]),
];

describe("RepaymentList Component", () => {
    test("with no transactions", () => {
        const onReload = vi.fn();

        const result = render(
            <ThemeProvider theme={theme}>
                <RepaymentList groupId={groupId} transactions={[]} onReload={onReload} />
            </ThemeProvider>
        );

        expect(result.container).toHaveTextContent("Keine Rückzahlungen nötig");
        expect(result.queryByRole("list")).not.toBeInTheDocument();
        expect(onReload).not.toHaveBeenCalled();
    });

    test("with sample transactions", () => {
        const onReload = vi.fn();

        const result = render(
            <ThemeProvider theme={theme}>
                <RepaymentList groupId={groupId} transactions={sampleTransactions} onReload={onReload} />
            </ThemeProvider>
        );

        const list = result.queryByRole("list");

        expect(list).toBeInTheDocument();
        expect(list?.children.length).toBeGreaterThanOrEqual(1);

        expect(onReload).not.toHaveBeenCalled();
    });

    test("repayment buttons", async () => {
        const user = userEvent.setup();
        const onReload = vi.fn();

        const result = render(
            <ThemeProvider theme={theme}>
                <RepaymentList groupId={groupId} transactions={sampleTransactions} onReload={onReload} />
            </ThemeProvider>
        );

        const repaymentButtons = result.getAllByText("Begleichen");
        expect(repaymentButtons.length).toBeGreaterThanOrEqual(1);

        const repaymentButton = repaymentButtons[0];

        await user.click(repaymentButton);
        await user.click(repaymentButton); // second click should not trigger again

        // wait 1 sec for network request and ui update
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
        });

        expect(onReload).toHaveBeenCalledTimes(1);
    });
});