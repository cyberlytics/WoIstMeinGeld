import { List, Typography } from "@mui/material";
import { useState } from "react";
import { FetchService } from "../FetchService";
import { Transaction } from "../models/Transaction";
import { TransactionDetailDialog } from "./TransactionDetailDialog";
import TransactionDialog from "./TransactionDialog";
import { TransactionListItem } from "./TransactionListItem";

interface Props {
    groupId: number;
    transactions: Transaction[];
    onReload(): void;
}

export function TransactionList(props: Props) {
    const { groupId, transactions, onReload } = props;

    const [detailsOpen, setDetailsOpen] = useState(false);
    const [openedTransaction, setOpenedTransaction] = useState<Transaction | null>(null);

    function openDetailsDialog(transaction: Transaction) {
        setOpenedTransaction(transaction);
        setDetailsOpen(true);
    }

    function closeDetailsDialog() {
        setDetailsOpen(false);
    }

    function deleteOpenedTransaction() {
        if (openedTransaction) {
            const jsonBody = { transactionId: openedTransaction.id };
            FetchService.delete("http://localhost:8080/deleteTransaction", jsonBody)
                .then(() => onReload())
                .catch((reason) => console.error(reason));
            setDetailsOpen(false);
        }
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
            <TransactionDialog groupId={groupId} onReload={onReload} />
        </>
    );
}
