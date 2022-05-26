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
import moment from "moment";
import { Add } from "@mui/icons-material";

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

interface Person {
    id: number;
    name: string;
}

// mockup Data
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
    const [date, setDate] = useState(moment());

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (person: Person) => {
        if (!debtors.includes(person)) setDebtors([...debtors, person]);
        else setDebtors(debtors.filter((p) => p.id != person.id));
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
                <DialogTitle>Neue Ausgabe </DialogTitle>
                <DialogContent dividers>
                    <TextField sx={{ mb: 1.5 }} fullWidth label="Verwendungszweck" variant="outlined" />

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
                                        <ListItemButton onClick={() => handleChange(person)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={debtors.indexOf(person) > -1}
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
                    <Button autoFocus variant="contained" onClick={handleClose}>
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
