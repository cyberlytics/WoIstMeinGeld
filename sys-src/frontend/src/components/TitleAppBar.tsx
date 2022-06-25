import AppBar from "@mui/material/AppBar";
import { IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { MoreVert, ArrowBack } from "@mui/icons-material";
import { FetchService } from "../FetchService";
import { PageRoutes } from "../Routes";
import { useNavigate, useLocation } from "react-router-dom";
import RemoveFromGroupDialog from "./RemoveFromGroupDialog";
import DeleteGroupDialog from "./DeleteGroupDialog";
import CopyToClipboard from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";

interface IProps {
    title?: string;
    isGroupScreen: boolean;
    groupId?: number;
}

const TitleAppBar = (props: IProps) => {
    const { title, isGroupScreen, groupId } = props;
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const location = useLocation();
    const showMenu = location.pathname != PageRoutes.signIn && location.pathname != PageRoutes.signUp;
    const { enqueueSnackbar } = useSnackbar();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        FetchService.post("http://localhost:8080/signOut", {})
            .then((response) => response.json())
            .then((response) => {
                navigate(PageRoutes.signIn);
                handleClose();
            })
            .catch((reason) =>
                enqueueSnackbar(reason, {
                    variant: "error",
                })
            );
    };

    const handleCopy = () => {
        enqueueSnackbar("Gruppen-ID erfolgreich kopiert!", {
            variant: "success",
        });
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ backgroundColor: "backgroundDark.main" }}>
                {isGroupScreen && (
                    <div className="appBarLeftMenuButton">
                        <IconButton size="large" onClick={() => navigate(-1)}>
                            <ArrowBack />
                        </IconButton>
                    </div>
                )}

                <Typography
                    className="appBarTitle"
                    variant="h4"
                    align="center"
                    component="div"
                    sx={{ flexGrow: 1 }}
                    data-testid="titleAppBarTitle"
                >
                    {title || "Wo ist mein Geld?"}
                </Typography>

                {showMenu && (
                    <div className="appBarRightMenuButton">
                        <IconButton size="small" onClick={handleMenu} data-testid="openThreePointMenu">
                            <MoreVert fontSize="large" color="primary" />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {isGroupScreen && (
                                <div>
                                    <MenuItem>
                                        <CopyToClipboard onCopy={handleCopy} text={groupId!.toString()}>
                                            <Typography>Gruppen-ID kopieren</Typography>
                                        </CopyToClipboard>
                                    </MenuItem>
                                    <RemoveFromGroupDialog title={title} groupId={groupId} />
                                    <DeleteGroupDialog title={title} groupId={groupId} />
                                </div>
                            )}
                            <MenuItem onClick={handleLogOut} color="error">
                                <Typography color="error">Ausloggen</Typography>
                            </MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

TitleAppBar.defaultProps = {
    isGroupScreen: false,
};

export default TitleAppBar;
