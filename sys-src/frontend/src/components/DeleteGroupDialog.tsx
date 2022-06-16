import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FetchService } from "../FetchService";
import { checkOpenRepayments } from "../checkOpenRepayments";
import { useNavigate } from "react-router-dom";

interface IProps {
    title?: string;
    groupId?: number;
}

export default function DeleteGroupDialog(props: IProps) {
    const { title, groupId } = props;
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDeleteGroup = async () => {
        const hasOpenRepayments = await checkOpenRepayments(groupId!);
        if (hasOpenRepayments) {
            setError(true);
            return;
        }
        const jsonBody = { id: groupId };
        FetchService.delete("http://localhost:8080/deleteGroup", jsonBody)
            .then(() => {
                handleClose();
                navigate(-1);
            })
            .catch((reason) => console.error(reason));
    };

    useEffect(() => {
        setError(false);
    }, [open]);

    return (
        <>
            <MenuItem aria-label="openDialogButton" onClick={handleClickOpen}>
                <Typography color="error">Gruppe löschen</Typography>
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
                    <DialogTitle>Gruppe löschen</DialogTitle>
                    <DialogContent dividers>
                        {error ? (
                            <Typography color="error">
                                {title} kann nicht gelöscht werden, da noch offene Ausgleichszahlungen austehen
                            </Typography>
                        ) : (
                            <Typography>{title} wirklich löschen?</Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="secondary">
                            Abbrechen
                        </Button>
                        {!error && (
                            <Button autoFocus variant="contained" onClick={handleDeleteGroup}>
                                Gruppe löschen
                            </Button>
                        )}
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
