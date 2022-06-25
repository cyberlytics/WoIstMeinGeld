import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FetchService } from "../FetchService";
import { checkOpenRepaymentsPerson } from "../checkOpenPaymentsPerson";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Person } from "../models/Person";

interface IProps {
    title?: string;
    groupId?: number;
}

export default function RemoveFromGroupDialog(props: IProps) {
    const { title, groupId } = props;
    const [open, setOpen] = useState(false);
    const [errorDebtor, setErrorDebtor] = useState(false);
    const [errorCreditor, setErrorCreditor] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //---
    const [personId, setPersonId] = useState<number | null>(null);
    function findPersonId() {
        FetchService.get("http://localhost:8080/getId")
            .then((response) => response.json())
            .then((personId: number) => setPersonId(personId))
            .catch((reason) => console.error(reason));
    }

    useEffect(() => {
        findPersonId();
    }, []);

    // checks if there are any transactions for the user
    const handleRemoveFromGroup = async () => {
        const personHasOpenRepayments = await checkOpenRepaymentsPerson(groupId!, personId!);
        if (personHasOpenRepayments == 4) {
            setError(true);
            return;
        }
        if (personHasOpenRepayments == 1) {
            setErrorCreditor(true);
            return;
        }
        if (personHasOpenRepayments == 2) {
            setErrorDebtor(true);
            return;
        }
        const jsonBody = { groupId: groupId };
        FetchService.post("http://localhost:8080/removeFromGroup", jsonBody)
            .then((response) => {
                enqueueSnackbar("Erfolgreich aus Gruppe ausgetreten!", {
                    variant: "success",
                });
                navigate(-1);
                handleClose();
            })
            .catch((reason) =>
                enqueueSnackbar(reason, {
                    variant: "error",
                })
            );
    };

    useEffect(() => {
        if (open) setErrorCreditor(false);
        if (open) setErrorDebtor(false);
        if (open) setError(false);
    }, [open]);

    return (
        <>
            <MenuItem aria-label="openDialogButton" onClick={handleClickOpen}>
                <Typography>Aus Gruppe austreten</Typography>
            </MenuItem>
            <div className="dialogContainer">
                <Dialog
                    onClose={handleClose}
                    open={open}
                    sx={{
                        overflowX: "hidden",
                        width: "100%",
                    }}
                >
                    <DialogTitle>Aus Gruppe austreten</DialogTitle>
                    <DialogContent dividers>
                        {error ? (
                            <Typography color="error" aria-label="errorMessage">
                                Ein Fehler ist aufgetreten, bitte versuche es später nochmal.
                            </Typography>
                        ) : errorDebtor ? (
                            <Typography color="error" aria-label="errorMessage">
                                Du hast noch offene Zahlungen in {title}! Andere Teilnehmer haben noch Schuden bei dir.
                            </Typography>
                        ) : errorCreditor ? (
                            <Typography color="error" aria-label="errorMessage">
                                Du hast noch offene Zahlungen in {title}! Bitte begleiche deine Schulden erst.
                            </Typography>
                        ) : (
                            <Typography>Aus der Gruppe {title} wirklich austreten?</Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="secondary">
                            Abbrechen
                        </Button>
                        {!error && !errorCreditor && !errorDebtor && (
                            <Button
                                autoFocus
                                variant="contained"
                                onClick={handleRemoveFromGroup}
                                aria-label="removeFromGroup"
                            >
                                Aus Gruppe austreten
                            </Button>
                        )}
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
