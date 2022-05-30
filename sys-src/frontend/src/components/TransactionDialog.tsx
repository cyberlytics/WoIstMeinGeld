import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {
    Checkbox,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Add } from "@mui/icons-material";
import { FetchService } from "../FetchService";

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

interface Person {
    id: number;
    name: string;
}

interface AddTransaction {
    group_id: number;
    creditor_id: number;
    description: string;
    //** time in ISOString */
    time: string;
    amount: number;
    debtors: number[];
}

// FIXME mock data needs to come from outside (group members)
const people: Person[] = [
    { id: 1, name: "Oliver Hansen" },
    { id: 2, name: "Van Henry" },
    { id: 3, name: "April Tucker" },
    { id: 4, name: "Ralph Hubbard" },
    { id: 5, name: "Oliver Hansen" },
    { id: 6, name: "Van Henry" },
    { id: 7, name: "April Tucker" },
    { id: 8, name: "Ralph Hubbard" },
];

export default function TransactionDialog() {
    const [open, setOpen] = useState(false);
    const [creditor, setCreditor] = useState("");
    const [debtors, setDebtors] = useState<Person[]>([]);
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSave = () => {
        const payload: AddTransaction = {
            group_id: 1, // FIXME needs to come from outside this component
            creditor_id: Number.parseInt(creditor),
            description,
            time: date.toISOString(),
            amount: Number.parseFloat(amount),
            // FIXME empty debtors array doesn't cause db error but should not be allowed
            debtors: debtors.map((d) => d.id),
        };
        // TODO edit and use FetchService
        FetchService.post("http://localhost:8080/createTransaction", payload)
            .then((res) => (res.ok ? handleClose() : console.error(res.status, res.statusText)))
            .catch((reason) => console.error(reason));
    };

    const switchDebtor = (person: Person) => {
        if (debtors.includes(person)) setDebtors(debtors.filter((d) => d !== person));
        else setDebtors([...debtors, person]);
    };

    return (
        <div className="dialogContainer">
            <IconButton className="openDialogButton" onClick={handleClickOpen}>
                <Add style={{ color: "black" }} />
            </IconButton>
            <Dialog
                onClose={handleClose}
                open={open}
                sx={{
                    overflowX: "hidden",
                    width: "100%",
                }}
            >
                <DialogTitle>Neue Ausgabe</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        value={description}
                        onChange={(e) => setDescription(e.currentTarget.value)}
                        sx={{ mb: 1.5 }}
                        fullWidth
                        label="Verwendungszweck"
                        variant="outlined"
                    />

                    <FormControl fullWidth sx={{ mb: 1.5 }}>
                        <InputLabel>Gläubiger</InputLabel>
                        <Select value={creditor} label="Gläubiger" onChange={(e) => setCreditor(e.target.value)}>
                            {people.map((person) => (
                                <MenuItem key={person.id} value={person.id}>
                                    {person.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        value={amount}
                        onChange={(e) => setAmount(e.currentTarget.value)}
                        sx={{ mb: 1.5 }}
                        fullWidth
                        label="Betrag"
                        type="number"
                        InputProps={{
                            endAdornment: <InputAdornment position="start">€</InputAdornment>,
                        }}
                    />

                    <DatePicker
                        label="Zahlungszeitpunkt"
                        value={date}
                        onChange={(newValue) => setDate(newValue!)}
                        renderInput={(params) => <TextField sx={{ mb: 1.5 }} fullWidth {...params} />}
                    />

                    <FormControl fullWidth sx={{ mb: 1.5 }}>
                        <Typography>Schuldner</Typography>
                        <List
                            sx={{
                                width: "100%",
                                position: "relative",
                                overflowY: "scroll",
                                overflowX: "hidden",
                                maxHeight: 300,
                            }}
                        >
                            {people.map((person) => {
                                return (
                                    <ListItem key={person.id} disablePadding>
                                        <ListItemButton onClick={() => switchDebtor(person)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    key={person.id}
                                                    edge="start"
                                                    checked={debtors.includes(person)}
                                                    tabIndex={-1}
                                                    disableRipple
                                                />
                                            </ListItemIcon>
                                            <ListItemText primary={person.name} />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant="contained" onClick={handleSave}>
                        Anlegen
                    </Button>
                    <Button autoFocus onClick={handleClose}>
                        Abbrechen
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
