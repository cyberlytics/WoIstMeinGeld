import { Button, Typography } from "@mui/material";
import CustomTextField from "./CustomTextField";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "./Routes";

export function SignUpDialog() {
    const navigate = useNavigate();

    return (
        <div className="signUpInContainer">
            <div className="signUpInContainerInner">
                <Typography variant="h5" className="signUpInItems" id="heading">
                    Registrieren
                </Typography>
                <CustomTextField color="primaryButton" variant="outlined" label="Name" className="signUpInItems" />
                <CustomTextField label="Passwort" type="password" className="signUpInItems" />
                <Button
                    color="primaryButton"
                    variant="contained"
                    className="signUpInItems"
                    sx={{ color: "secondaryFont.main" }}
                >
                    Registrieren
                </Button>
                <div className="block">
                    <Typography className="separator">oder</Typography>
                </div>
                <Button
                    color="fontWhite"
                    variant="contained"
                    className="signUpInItems"
                    onClick={() => navigate(PageRoutes.signIn)}
                    sx={{ color: "secondaryFont.main" }}
                >
                    Einloggen
                </Button>
            </div>
        </div>
    );
}
