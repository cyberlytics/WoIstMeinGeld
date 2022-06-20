import AppBar from "@mui/material/AppBar";
import { IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { MoreVert, ArrowBackIos } from "@mui/icons-material";
import { FetchService } from "../FetchService";
import { PageRoutes } from "../Routes";
import { useNavigate, useLocation } from "react-router-dom";
import DeleteGroupDialog from "./DeleteGroupDialog";

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
                console.log(response);
                navigate(PageRoutes.signIn);
                handleClose();
            })
            .catch((reason) => console.error(reason));
    };

    const handleRemoveFromGroup = () => {
        const jsonBody = { groupId: groupId };
        FetchService.post("http://localhost:8080/removeFromGroup", jsonBody)
            .then((response) => {
                navigate(-1);
                handleClose();
            })
            .catch((reason) => console.error(reason));
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ backgroundColor: "backgroundDark.main" }}>
                {isGroupScreen && (
                    <div className="appBarLeftMenuButton">
                        <IconButton size="small" onClick={() => navigate(-1)}>
                            <ArrowBackIos fontSize="large" />
                        </IconButton>
                    </div>
                )}

                <Typography className="appBarTitle" variant="h4" align="center" component="div" sx={{ flexGrow: 1 }}>
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
                                    <MenuItem onClick={handleRemoveFromGroup}>
                                        <Typography>Aus Gruppe austreten</Typography>
                                    </MenuItem>
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