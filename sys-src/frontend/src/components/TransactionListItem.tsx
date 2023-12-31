import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { formatMoney } from "../format/formatMoney";
import { formatTime } from "../format/formatTime";
import { Transaction } from "../models/Transaction";

interface Props {
    transaction: Transaction;
    onClick(transaction: Transaction): void;
}

export function TransactionListItem(props: Props) {
    const { transaction, onClick } = props;
    const { description, creditor, amount, time } = transaction;

    return (
        <ListItem
            divider
            disablePadding
            data-testid="transactionListItem"
            secondaryAction={
                <ListItemText
                    primary={formatMoney(amount)}
                    secondary={formatTime(time)}
                    style={{ textAlign: "right" }}
                />
            }
        >
            <ListItemButton onClick={() => onClick(transaction)} data-testid="transactionListItemButton">
                <ListItemText primary={description} secondary={`Bezahlt von ${creditor?.name}`} />
            </ListItemButton>
        </ListItem>
    );
}
