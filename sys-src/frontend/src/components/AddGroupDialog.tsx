import {
    Alert,
    AlertTitle,
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
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { FetchService } from "../FetchService";
import id from "date-fns/esm/locale/id/index.js";
import { Person } from "../models/Person";

interface AddGroup {
    name: string;
    creator_id: number;
}

export default function AddGroupDialog() {
    const [open, setOpen] = useState(false);
    const [groupLink, setGroupLink] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
        const payload: AddGroup = {
            name: groupName,
            creator_id: 1, //TODO kapier ich nicht
        };
        console.log(payload);
        FetchService.post("http://localhost:8080/createGroup", payload)
            .then((res) => (res.ok ? handleClose() : console.error(res.status, res.statusText)))
            .catch((reason) => console.error(reason));
    };

    return (
        <div className="groupDialogContainer">
            <div>
                <IconButton className="openGroupDialogButton" onClick={handleMenu}>
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
                        <Typography>Neue Gruppe</Typography>
                    </MenuItem>
                    <MenuItem>
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
                        fullWidth
                        sx={{ mb: 1.5 }}
                        label="Gruppenname"
                        value={groupName}
                        onChange={(e) => setGroupName(e.currentTarget.value)}
                    ></TextField>
                    {/* Der Link kann eigentlich raus, den kriegt man erst bei der Gruppe */}
                    <div>
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
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleSave}>
                        Gruppe erstellen
                    </Button>
                    <Button variant="text" onClick={handleClose} color="secondary">
                        Abbrechen
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
