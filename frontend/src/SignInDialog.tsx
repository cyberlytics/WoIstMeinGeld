import { Button, Typography } from "@mui/material";
import CustomTextField from "./CustomTextField";

interface ISignInDialog {
    setShow(show: boolean): void;
}

export function SignInDialog(props: ISignInDialog) {
    const { setShow } = props;

    return (
        <div className="signUpInContainer">
            <div className="signUpInContainerInner">
                <Typography variant="h5" className="signUpInItems" id="heading">
                    Einloggen
                </Typography>
                <CustomTextField color="primaryButton" variant="outlined" label="Name" className="signUpInItems" />
                <CustomTextField label="Passwort" type="password" className="signUpInItems" />
                <Button
                    color="primaryButton"
                    variant="contained"
                    className="signUpInItems"
                    sx={{ color: "secondaryFont.main" }}
                >
                    Einloggen
                </Button>
                <div className="block">
                    <Typography className="separator">oder</Typography>
                </div>
                <Button
                    color="fontWhite"
                    variant="contained"
                    className="signUpInItems"
                    onClick={() => setShow(false)}
                    sx={{ color: "secondaryFont.main" }}
                >
                    Registrieren
                </Button>
            </div>
        </div>
    );
}
