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
    const { description, creditor_id, amount, time } = transaction;

    return (
        <ListItem
            divider
            disablePadding
            secondaryAction={
                <ListItemText
                    primary={formatMoney(amount)}
                    secondary={formatTime(time)}
                    style={{ textAlign: "right" }}
                />
            }
        >
            <ListItemButton onClick={() => onClick(transaction)}>
                <ListItemText primary={description} secondary={`Bezahlt von ${creditor_id}`} />
            </ListItemButton>
        </ListItem>
    );
}
