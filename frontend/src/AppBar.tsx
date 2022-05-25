import AppBar from "@mui/material/AppBar";
import { Typography } from "@mui/material";

const AppBarGeld = () => {
    return (
        <AppBar position="static">
            <Typography className="appBarTitle" variant="h4" align="center">
                Wo ist mein Geld?
            </Typography>
        </AppBar>
    );
};
export default AppBarGeld;
