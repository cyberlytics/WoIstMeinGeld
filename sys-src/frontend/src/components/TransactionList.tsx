import { List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FetchService } from "../FetchService";
import { Transaction } from "../models/Transaction";
import { TransactionDetailDialog } from "./TransactionDetailDialog";
import TransactionDialog from "./TransactionDialog";
import { TransactionListItem } from "./TransactionListItem";

export function TransactionList() {
    const [transactions, setTransactions] = useState<Transaction[] | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [openedTransaction, setOpenedTransaction] = useState<Transaction | null>(null);

    useEffect(() => {
        findAllTransactions();
    }, []);

    function openDetailsDialog(transaction: Transaction) {
        setOpenedTransaction(transaction);
        setDetailsOpen(true);
    }

    function closeDetailsDialog() {
        setDetailsOpen(false);
    }

    function findAllTransactions() {
        FetchService.get("http://localhost:8080/findAllTransactions")
            .then((response) => response.json())
            .then((transactions: Transaction[]) => setTransactions(transactions))
            .catch((reason) => console.error(reason));
    }

    function deleteOpenedTransaction() {
        if (openedTransaction) {
            FetchService.delete("http://localhost:8080/deleteTransaction", { id: openedTransaction.id })
                .then((response) => response.json())
                .then(() => findAllTransactions())
                .catch((reason) => console.error(reason));
            setDetailsOpen(false);
        }
    }

    if (transactions === null) {
        return <Typography color="textSecondary">Ausgaben werden geladen...</Typography>;
    }

    return (
        <>
            <List>
                {transactions.map((transaction) => (
                    <TransactionListItem key={transaction.id} transaction={transaction} onClick={openDetailsDialog} />
                ))}
            </List>
            <TransactionDetailDialog
                open={detailsOpen}
                transaction={openedTransaction}
                onClose={closeDetailsDialog}
                onDelete={deleteOpenedTransaction}
            />
            <TransactionDialog />
        </>
    );
}
