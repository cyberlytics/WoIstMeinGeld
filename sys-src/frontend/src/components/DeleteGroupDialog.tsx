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
import { useSnackbar } from "notistack";

interface IProps {
    title?: string;
    groupId?: number;
}

export default function DeleteGroupDialog(props: IProps) {
    const { title, groupId } = props;
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    /**
     * check if group has open repayments, if so, delete group
     */
    const handleDeleteGroup = async () => {
        const hasOpenRepayments = await checkOpenRepayments(groupId!);
        if (hasOpenRepayments) {
            setError(true);
            return;
        }
        const jsonBody = { groupId: groupId };
        FetchService.delete("http://localhost:8080/deleteGroup", jsonBody)
            .then(() => {
                enqueueSnackbar(title + " wurde erfolgreich gelöscht!", {
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
        if (open) setError(false);
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
                            <Typography color="error" aria-label="errorMessage">
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
                            <Button autoFocus variant="contained" onClick={handleDeleteGroup} aria-label="deleteGroup">
                                Gruppe löschen
                            </Button>
                        )}
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
