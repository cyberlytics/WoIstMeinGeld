import { Button, List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FetchService } from "../FetchService";
import { Transaction } from "../models/Transaction";
import TransactionDialog from "./TransactionDialog";
import { TransactionListItem } from "./TransactionListItem";

export function TransactionList() {
    const [transactions, setTransactions] = useState<Transaction[] | null>(null);

    useEffect(() => {
        FetchService.get("http://localhost:8080/findAllTransactions")
            .then((transactions: Transaction[]) => setTransactions(transactions))
            .catch(console.error);
    }, []);

    if (transactions === null) {
        return <Typography color="textSecondary">Ausgaben werden geladen...</Typography>;
    }

    return (
        <>
            <List>
                {transactions.map((transaction) => (
                    <TransactionListItem key={transaction.id} transaction={transaction} />
                ))}
            </List>
            <TransactionDialog />
        </>
    );
}
