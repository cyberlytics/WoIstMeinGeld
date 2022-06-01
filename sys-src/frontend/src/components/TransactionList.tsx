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

    function findAllTransactions() {
        FetchService.get("http://localhost:8080/findAllTransactions")
            .then((response) => response.json())
            .then((transactions: Transaction[]) => setTransactions(transactions))
            .catch((reason) => console.error(reason));
    }

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

    function deleteOpenedTransaction() {
        if (openedTransaction) {
            FetchService.delete("http://localhost:8080/deleteTransaction", { id: openedTransaction.id })
                .then(() => findAllTransactions())
                .catch((reason) => console.error(reason));
            setDetailsOpen(false);
        }
    }

    if (transactions === null) {
        return null;
    }

    return (
        <>
            {transactions.length ? (
                <List>
                    {transactions.map((transaction) => (
                        <TransactionListItem
                            key={transaction.id}
                            transaction={transaction}
                            onClick={openDetailsDialog}
                        />
                    ))}
                </List>
            ) : (
                <Typography variant="h5" align="center" style={{ padding: "20px" }}>
                    Keine Ausgaben vorhanden
                </Typography>
            )}
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
