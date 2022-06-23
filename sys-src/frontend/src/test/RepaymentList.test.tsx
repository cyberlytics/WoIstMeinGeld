import { vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { RepaymentList } from "../components/RepaymentList";
import { Transaction } from "../models/Transaction";
import { Person } from "../models/Person";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material";
import theme from "../ThemeProvider";
import { SnackbarProvider } from "notistack";

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
    createSampleTransaction(3, personSandra, "Schlittschuh fahren", 11.5, [personPeter, personPaul]),
    createSampleTransaction(4, personPaul, "Museum", 10, [personSandra]),
    createSampleTransaction(5, personPeter, "Bierzelt", 40, [personPaul, personSandra]),
];

describe("RepaymentList Component", () => {
    test("with no transactions", () => {
        const onReload = vi.fn();

        const result = render(
            <SnackbarProvider>
                <ThemeProvider theme={theme}>
                    <RepaymentList groupId={groupId} transactions={[]} onReload={onReload} />
                </ThemeProvider>
            </SnackbarProvider>
        );

        const list = result.queryByRole("list");

        expect(result.container).toHaveTextContent("Keine Rückzahlungen nötig");
        expect(list).not.toBeInTheDocument();
        expect(onReload).not.toHaveBeenCalled();
    });

    test("with sample transactions", () => {
        const onReload = vi.fn();

        const result = render(
            <SnackbarProvider>
                <ThemeProvider theme={theme}>
                    <RepaymentList groupId={groupId} transactions={sampleTransactions} onReload={onReload} />
                </ThemeProvider>
            </SnackbarProvider>
        );

        const list = result.queryByRole("list");

        expect(list).toBeInTheDocument();

        // minimum: one repayment
        // maximum: two repayments (because three people are involved)
        expect(list?.children.length).toBeGreaterThan(0);
        expect(list?.children.length).toBeLessThan(3);

        expect(onReload).not.toHaveBeenCalled();
    });

    test("repayment buttons", async () => {
        const user = userEvent.setup();
        const onReload = vi.fn();

        const result = render(
            <SnackbarProvider>
                <ThemeProvider theme={theme}>
                    <RepaymentList groupId={groupId} transactions={sampleTransactions} onReload={onReload} />
                </ThemeProvider>
            </SnackbarProvider>
        );

        let repaymentButtons = result.getAllByText("Begleichen");
        const buttonsLength = repaymentButtons.length;

        // minimum: one repayment
        // maximum: two repayments (because three people are involved)
        expect(buttonsLength).toBeGreaterThan(0);
        expect(buttonsLength).toBeLessThan(3);

        const repaymentButton = repaymentButtons[0];

        await user.click(repaymentButton);
        await user.click(repaymentButton); // second click should not trigger again

        await waitFor(() => {
            expect(onReload).toHaveBeenCalledTimes(1);
        });
    });
});
