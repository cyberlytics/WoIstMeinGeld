import { vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Transaction } from "../models/Transaction";
import { Person } from "../models/Person";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "@mui/material";
import theme from "../ThemeProvider";
import { SnackbarProvider } from "notistack";
import { TransactionList } from "../components/TransactionList";

const groupId = 1;

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

function createTransaction(
    id: number,
    description: string,
    creditor_id: number,
    amount: number,
    time: string,
    creditor: Person,
    debtors: Person[]
): Transaction {
    return {
        id: id,
        group_id: groupId,
        description: description,
        creditor_id: creditor_id,
        amount: amount,
        time: time,
        creditor: creditor,
        debtors: debtors,
    };
}

const threeTransactions: Transaction[] = [
    createTransaction(1, "Apples", 1, 5, "2022-06-01 12:00:00", alice, [bob, charlie]),
    createTransaction(2, "Bananas", 2, 10, "2022-06-02 12:00:00", bob, [alice, charlie]),
    createTransaction(3, "Cherries", 3, 15, "2022-06-03 12:00:00", charlie, [alice, bob]),
];

describe("TransactionList Component", () => {
    test("without transactions", () => {
        const onReload = vi.fn();

        const result = render(
            <SnackbarProvider>
                <ThemeProvider theme={theme}>
                    <TransactionList groupId={groupId} transactions={[]} onReload={onReload} />
                </ThemeProvider>
            </SnackbarProvider>
        );

        const list = result.queryByRole("list");

        expect(result.container).toHaveTextContent("Keine Ausgaben vorhanden");
        expect(list).not.toBeInTheDocument();
        expect(onReload).not.toHaveBeenCalled();
    });

    test("with three transactions", () => {
        const onReload = vi.fn();

        const result = render(
            <SnackbarProvider>
                <ThemeProvider theme={theme}>
                    <TransactionList groupId={groupId} transactions={threeTransactions} onReload={onReload} />
                </ThemeProvider>
            </SnackbarProvider>
        );

        const list = result.queryByRole("list");

        expect(list).toBeInTheDocument();
        expect(list?.children).toHaveLength(3);

        /*
         * Test if the list is ordered by date (descending) is not possible because
         * the sorting has already happened in a sql query in the backend.
         */

        expect(onReload).not.toHaveBeenCalled();
    });

    test("click on transaction", async () => {
        const user = userEvent.setup();
        const onReload = vi.fn();

        const result = render(
            <SnackbarProvider>
                <ThemeProvider theme={theme}>
                    <TransactionList groupId={groupId} transactions={threeTransactions} onReload={onReload} />
                </ThemeProvider>
            </SnackbarProvider>
        );

        const listItemButtons = result.getAllByTestId("transactionListItemButton");

        expect(listItemButtons).toHaveLength(3);

        let transactionDetailDialog = result.queryByTestId("transactionDetailDialog");

        // check if transaction detail dialog is not open
        expect(transactionDetailDialog).not.toBeInTheDocument();

        const firstListItemButton = listItemButtons[0];

        // click on list item
        await user.click(firstListItemButton);

        // wait 1 sec for network request and ui update
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
        });

        transactionDetailDialog = result.queryByTestId("transactionDetailDialog");

        // check if transaction detail dialog has opened
        expect(transactionDetailDialog).toBeInTheDocument();

        expect(onReload).not.toHaveBeenCalled();
    });

    test("click on remove or close button in detail dialog", async () => {
        const user = userEvent.setup();
        const onReload = vi.fn();

        const result = render(
            <SnackbarProvider>
                <ThemeProvider theme={theme}>
                    <TransactionList groupId={groupId} transactions={threeTransactions} onReload={onReload} />
                </ThemeProvider>
            </SnackbarProvider>
        );

        const listItemButtons = result.getAllByTestId("transactionListItemButton");

        const firstListItemButton = listItemButtons[0];

        // click on list item
        await user.click(firstListItemButton);

        // wait 1 sec for network request and ui update
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
        });

        const removeButton = result.getByText("Entfernen");

        // click on remove button of transaction detail dialog
        await user.click(removeButton);

        // wait 1 sec for network request and ui update
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
        });

        const transactionDetailDialog = result.queryByTestId("transactionDetailDialog");

        // why does this test fail?
        // check if transaction detail dialog has closed
        expect(transactionDetailDialog).not.toBeInTheDocument();

        // click on list item
        await user.click(firstListItemButton);

        // wait 1 sec for network request and ui update
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
        });

        const closeButton = result.getByText("Schließen");

        // click on close button of transaction detail dialog
        await user.click(closeButton);

        // wait 1 sec for network request and ui update
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
        });

        // why does this test fail?
        // check if transaction detail dialog has closed
        expect(transactionDetailDialog).not.toBeInTheDocument();

        /*
         * Test if one transaction item has been removed from the transaction list
         * is not possible because after the deletion of one transaction,
         * a sql query in the backend will be executed and the page will
         * be reloaded with the new data.
         */

        expect(onReload).not.toHaveBeenCalled();
    });
});
