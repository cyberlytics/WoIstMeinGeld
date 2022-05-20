import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import CustomButton from "./CustomButton";
import CustomTextField from "./CustomTextField";

interface ISignUpDialog {
    setShow(show: boolean): void;
}

export function SignUpDialog(props: ISignUpDialog) {
    const { setShow } = props;

    return (
        <div>
            <div className="signUpContainer">
                <div className="signUpContainerInner">
                    <Typography variant="h5" className="signUpItems" id="heading">
                        Registrieren
                    </Typography>
                    <CustomTextField color="primaryButton" variant="outlined" label="Name" className="signUpItems" />
                    <CustomTextField label="Passwort" type="password" className="signUpItems" />
                    <Button
                        color="primaryButton"
                        variant="contained"
                        className="signUpItems"
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
                        className="signUpItems"
                        onClick={() => setShow(false)}
                        sx={{ color: "secondaryFont.main" }}
                    >
                        Einloggen
                    </Button>
                </div>
            </div>
        </div>
    );
}
