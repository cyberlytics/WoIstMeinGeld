import { Delete, Euro, Event, Person } from "@mui/icons-material";
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import { formatMoney } from "../format/formatMoney";
import { formatTime } from "../format/formatTime";
import { Transaction } from "../models/Transaction";

interface Props {
    open: boolean;
    transaction: Transaction | null;
    onClose(): void;
    onDelete(): void;
}

export function TransactionDetailDialog(props: Props) {
    const { open, transaction, onClose, onDelete } = props;

    const demoDebtors = ["Claire Anlage", "Rita aus Weiden", "Peter Meter", "Anna Nass"];

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{transaction?.description}</DialogTitle>
            <DialogContent>
                <List dense>
                    <ListItem disableGutters>
                        <ListItemAvatar>
                            <Avatar>
                                <Person />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={transaction?.creditor_id} secondary="Bezahlt von" />
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemAvatar>
                            <Avatar>
                                <Euro />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={formatMoney(transaction?.amount || 0)} secondary="Betrag" />
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemAvatar>
                            <Avatar>
                                <Event />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={formatTime(transaction?.time || "")} secondary="Zahlungszeitpunkt" />
                    </ListItem>
                </List>
                <Typography color="textSecondary">Schuldner</Typography>
                <List dense>
                    {demoDebtors.map((debtor) => (
                        <ListItem key={debtor} disableGutters>
                            <ListItemAvatar>
                                <Avatar>
                                    <Person />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={debtor} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="error" startIcon={<Delete />} onClick={onDelete}>
                    Entfernen
                </Button>
                <Button variant="contained" onClick={onClose}>
                    Schließen
                </Button>
            </DialogActions>
        </Dialog>
    );
}
