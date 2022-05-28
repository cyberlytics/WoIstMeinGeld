import { ListItem, ListItemText } from "@mui/material";
import { formatMoney } from "../format/formatMoney";
import { formatTime } from "../format/formatTime";
import { Transaction } from "../models/Transaction";

interface Props {
    transaction: Transaction;
}

export function TransactionListItem(props: Props) {
    const { description, creditor_id, amount, time } = props.transaction;

    return (
        <ListItem
            divider={true}
            secondaryAction={
                <ListItemText
                    primary={formatMoney(amount)}
                    secondary={formatTime(time)}
                    style={{ textAlign: "right" }}
                />
            }
        >
            <ListItemText primary={description} secondary={`Bezahlt von ${creditor_id}`} />
        </ListItem>
    );
}
