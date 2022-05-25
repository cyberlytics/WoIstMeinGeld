import { PureComponent, ReactNode } from "react";
import AppBar from "@mui/material/AppBar";
import { makeStyles, Typography } from "@mui/material";
// class AppBar extends PureComponent {
//     render(): ReactNode {
//         return (
//             <div className="appBarContainer">
//                 <h1 className="appBarTitle">Wo ist mein Geld?</h1>
//             </div>
//         );
//     }
// }

const AppBarGeld = () => {
    return (
        <div className="appBarContainer">
            <AppBar position="static" sx={{ boxShadow: 0 }}>
                <Typography
                    sx={{ bgcolor: "secondary.main", boxShadow: 0, fontWeight: "bold" }}
                    className="appBarTitle"
                    variant="h4"
                    component="div"
                >
                    Wo ist mein Geld?
                </Typography>
            </AppBar>
        </div>
    );
};
export default AppBarGeld;
