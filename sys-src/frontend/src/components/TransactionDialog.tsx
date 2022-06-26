import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {
    Checkbox,
    FormControl,
    FormGroup,
    FormHelperText,
    FormLabel,
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
import { useEffect, useState } from "react";
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

interface IProps {
    groupId: number;
    onReload(): void;
}

export default function TransactionDialog(props: IProps) {
    const { groupId, onReload } = props;
    const [open, setOpen] = useState(false);
    const [creditor, setCreditor] = useState("");
    const [debtors, setDebtors] = useState<Person[]>([]);
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState(false);
    const [people, setPeople] = useState<Person[]>([]);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        onReload();
        setOpen(false);
    };
    const handleSave = () => {
        //check if all information is present
        if (!(creditor && debtors.length > 0 && date && description && amount)) {
            setError(true);
            return;
        }

        //reset errors
        setError(false);

        const payload: AddTransaction = {
            group_id: groupId,
            creditor_id: Number.parseInt(creditor),
            description,
            time: date.toISOString(),
            amount,
            debtors: debtors.map((d) => d.id),
        };

        FetchService.post("http://localhost:8080/createTransaction", payload)
            .then((res) => (res.ok ? handleClose() : console.error(res.status, res.statusText)))
            .catch((reason) => console.error(reason));
    };

    const switchDebtor = (person: Person) => {
        if (debtors.includes(person)) setDebtors(debtors.filter((d) => d !== person));
        else setDebtors([...debtors, person]);
    };

    useEffect(() => {
        setError(false);
        setDescription("");
        setCreditor("");
        setAmount(0);
        setDate(new Date());
        setDebtors([]);
    }, [open]);

    useEffect(() => {
        FetchService.get("http://localhost:8080/getGroupUsers/" + groupId)
            .then((response) => response.json())
            .then((response: Person[]) => setPeople(response))
            .catch((reason) => console.error(reason));
    }, [groupId, open]);

    return (
        <div className="dialogContainer">
            <IconButton aria-label="openDialogButton" className="openDialogButton" onClick={handleClickOpen}>
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
                        required
                        error={error && description.length <= 0}
                        value={description}
                        onChange={(e) => setDescription(e.currentTarget.value)}
                        sx={{ mb: 1.5 }}
                        fullWidth
                        label="Verwendungszweck"
                        variant="outlined"
                        inputProps={{ "data-testid": "Verwendungszweck" }}
                    />

                    <TextField
                        sx={{ mb: 1.5 }}
                        fullWidth
                        select
                        required
                        error={error && creditor.length <= 0}
                        label="Gläubiger"
                        onChange={(e) => setCreditor(e.target.value)}
                        value={creditor ?? ""}
                        inputProps={{ "data-testid": "Gläubiger" }}
                    >
                        {people.map((person) => (
                            <MenuItem key={person.id} value={person.id}>
                                {person.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        required
                        error={error && amount <= 0}
                        value={amount}
                        onChange={(e) => setAmount(Number(e.currentTarget.value))}
                        sx={{ mb: 1.5 }}
                        fullWidth
                        label="Betrag"
                        type="number"
                        inputProps={{ "data-testid": "Betrag" }}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">€</InputAdornment>,
                        }}
                    />

                    <DatePicker
                        label="Zahlungszeitpunkt"
                        value={date}
                        mask="__.__.____"
                        onChange={(newValue) => setDate(newValue!)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                required
                                data-testid="Zahlungszeitpunkt"
                                error={error && date == undefined}
                                sx={{ mb: 1.5 }}
                                fullWidth
                            />
                        )}
                    />

                    <FormControl fullWidth sx={{ mb: 1.5 }} required error={error && debtors.length <= 0}>
                        <FormLabel>Schuldner</FormLabel>
                        <FormGroup>
                            <List
                                sx={{
                                    width: "100%",
                                    position: "relative",
                                    overflowY: "scroll",
                                    overflowX: "hidden",
                                    maxHeight: 300,
                                }}
                            >
                                {people.length !== 0
                                    ? people.map((person) => {
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
                                      })
                                    : "Keine Gruppenmitglieder vorhanden"}
                            </List>
                            <FormHelperText>Mindestens einen Schuldner auswählen</FormHelperText>
                        </FormGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="secondary">
                        Abbrechen
                    </Button>
                    <Button autoFocus variant="contained" onClick={handleSave}>
                        Anlegen
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
