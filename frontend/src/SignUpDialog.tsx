import { Button, Typography } from "@mui/material";
import CustomTextField from "./CustomTextField";

interface ISignUpDialog {
    setShow(show: boolean): void;
}

export function SignUpDialog(props: ISignUpDialog) {
    const { setShow } = props;

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
                    onClick={() => setShow(true)}
                    sx={{ color: "secondaryFont.main" }}
                >
                    Einloggen
                </Button>
            </div>
        </div>
    );
}
