import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { FetchService } from "../FetchService";
import { useNavigate } from "react-router-dom";

interface AddGroup {
    name: string;
    creator_id?: number;
}

interface AddById {
    id: number;
}

interface IProps {
    onReload(): void;
}

export default function AddGroupDialog(props: IProps) {
    const { onReload } = props;
    const [open, setOpen] = useState(false);
    const [openJoin, setOpenJoin] = useState(false);
    const [groupLink, setGroupLink] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [groupIdJoin, setGroupIdJoin] = useState<number | null>(null);
    const [error, setError] = useState(false);
    const [text, setText] = useState("");
    const [errorText, setErrorText] = useState("");
    const [isGroupNameEmpty, setIsGroupNameEmpty] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setAnchorEl(null);
        setOpen(true);
        setGroupLink("diesWäreDerGruppenlink");
    };
    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
    };

    const handleCopy = () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSave = () => {
        setErrorText("");
        setIsGroupNameEmpty(false);
        const payload: AddGroup = {
            name: groupName,
        };
        FetchService.post("http://localhost:8080/createGroup", payload)
            .then((res) => {
                if (res.ok) {
                    handleClose();
                    onReload();
                } else {
                    console.error(res.status, res.statusText);
                }
            })
            .catch((reason) => console.error(reason));
    };

    const handleClickOpenJoin = () => {
        setAnchorEl(null);
        setOpenJoin(true);
    };

    const handleCloseJoin = () => {
        onReload();
        setOpenJoin(false);
        setAnchorEl(null);
    };

    const handleError = (reason: number) => {
        if (reason == 422) {
            setText("Die Angegebene Gruppe Existiert nicht!");
            setError(true);
        }
        if (reason == 0) {
            setText("Die Eingabe darf nicht leer sein");
            setError(true);
        }
    };

    const handleJoin = () => {
        //reset errors
        setError(false);
        if (!groupIdJoin) {
            handleError(0);
            return;
        }

        const payload: AddById = {
            id: Number(groupIdJoin),
        };
        console.log(payload);
        FetchService.post("http://localhost:8080/addToGroup", payload)
            .then((res) => (res.ok ? handleCloseJoin() : handleError(res.status)))
            .catch((reason) => handleError(reason));
    };

    const handleJoinKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleJoin();
        }
    };

    const handleCreateKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSave();
        }
    };

    //to clear textfiled after pressing Button "abbrechen"
    useEffect(() => {
        setError(false);
        setGroupIdJoin(null);
        setText("");
    }, [openJoin]);

    return (
        <div className="groupDialogContainer">
            <IconButton data-testid="openGroupDialogButton" className="openGroupDialogButton" onClick={handleMenu}>
                <Add style={{ color: "black" }} />
            </IconButton>
            <div>
                <IconButton aria-label="openGroupDialogButton" className="openGroupDialogButton" onClick={handleMenu}>
                    <Add style={{ color: "black" }} />
                </IconButton>
                <Menu
                    id="menu-groups"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClickOpen}>
                        <Typography data-testid="newGroup">Neue Gruppe</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClickOpenJoin}>
                        <Typography>Gruppe beitreten</Typography>
                    </MenuItem>
                </Menu>
            </div>
            <Dialog
                onClose={handleClose}
                open={open}
                fullWidth
                sx={{
                    overflowX: "hidden",
                    width: "100%",
                }}
            >
                <DialogTitle>Neue Gruppe erstellen</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        data-testid="groupName"
                        fullWidth
                        autoFocus
                        sx={{ mb: 1.5 }}
                        label="Gruppenname"
                        value={groupName}
                        onChange={(e) => setGroupName(e.currentTarget.value)}
                        helperText={errorText}
                        error={isGroupNameEmpty}
                        onKeyDown={handleCreateKeyDown}
                    />
                    {/* Der Link kann eigentlich raus, den kriegt man erst bei der Gruppe */}
                    {/* <div>
                        <TextField
                            style={{ width: "92%" }}
                            sx={{ mb: 1.5 }}
                            label={"Gruppenlink"}
                            value={groupLink}
                            disabled={true}
                        ></TextField>
                        <CopyToClipboard onCopy={handleCopy} text={groupLink}>
                            <IconButton>
                                <ContentCopyIcon />
                            </IconButton>
                        </CopyToClipboard>
                        {isCopied ? <Alert severity="success">Link in Zwischenablage kopiert!</Alert> : null}
                    </div> */}
                </DialogContent>
                <DialogActions>
                    <Button data-testid="cancelCreateGroup" variant="text" onClick={handleClose} color="secondary">
                        Abbrechen
                    </Button>
                    <Button data-testid="createGroup" variant="contained" onClick={handleSave}>
                        Gruppe erstellen
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                onClose={handleCloseJoin}
                open={openJoin}
                fullWidth
                sx={{
                    overflowX: "hidden",
                    width: "100%",
                }}
            >
                <DialogTitle>Gruppe beitreten</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        className="groupJoinField"
                        fullWidth
                        autoFocus
                        error={error}
                        sx={{ mb: 1.5 }}
                        label="Gruppen-ID"
                        type="number"
                        helperText={text}
                        value={groupIdJoin ?? ""}
                        onChange={(e) => setGroupIdJoin(Number(e.currentTarget.value))}
                        inputProps={{ "data-testid": "groupnameJoin", error: { error } }}
                        onKeyDown={handleJoinKeyDown}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="text" onClick={handleCloseJoin} color="secondary">
                        Abbrechen
                    </Button>
                    <Button variant="contained" onClick={handleJoin}>
                        Gruppe beitreten
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
