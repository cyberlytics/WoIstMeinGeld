import { List } from "@mui/material";
import { Transaction } from "../models/Transaction";
import { TransactionListItem } from "./TransactionListItem";

interface Props {
    transactions: Transaction[];
}

export function TransactionList(props: Props) {
    const { transactions } = props;

    return (
        <List>
            {transactions.map((transaction) => (
                <TransactionListItem key={transaction.id} transaction={transaction} />
            ))}
        </List>
    );
}
