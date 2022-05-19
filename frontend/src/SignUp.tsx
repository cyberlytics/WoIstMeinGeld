import { Button, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

const registerButtonTheme = createTheme({
    palette: {
        primary: {
            main: "#EFB90B",
        },
    },
});

const logInButtonTheme = createTheme({
    palette: {
        primary: {
            main: "#FFFFFF",
        },
    },
});

const textFieldTheme = createTheme({
    palette: {
        primary: {
            main: "#AEB4BC",
        },
    },
});

interface ISignUpDialog {
    show: boolean;
}

export function SignUpDialog(props: ISignUpDialog) {
    const { show } = props;
    const [open, openDialog] = useState(true);

    return (
        <div>
            {open && (
                <div className="signUpContainer">
                    <div className="signUpContainerInner">
                        <Typography variant="h5" className="signUpItems" id="heading">
                            Registrieren
                        </Typography>
                        <ThemeProvider theme={textFieldTheme}>
                            <TextField
                                variant="outlined"
                                label="Name"
                                className="signUpItems"
                                sx={{ input: { color: "#AEB4BC" } }}
                                InputLabelProps={{
                                    style: { color: "#AEB4BC" },
                                }}
                            />
                            <TextField
                                label="Passwort"
                                type="password"
                                className="signUpItems"
                                sx={{ input: { color: "#AEB4BC" } }}
                                InputLabelProps={{
                                    style: { color: "#AEB4BC" },
                                }}
                            />
                        </ThemeProvider>
                        <ThemeProvider theme={registerButtonTheme}>
                            <Button variant="contained" className="signUpItems">
                                Registrieren
                            </Button>
                        </ThemeProvider>
                        <div className="block">
                            <hr />
                            <Typography className="signUpItems" id="text">
                                oder
                            </Typography>
                            <hr />
                        </div>
                        <ThemeProvider theme={logInButtonTheme}>
                            <Button variant="contained" className="signUpItems" onClick={() => openDialog(show)}>
                                Einloggen
                            </Button>
                        </ThemeProvider>
                    </div>
                </div>
            )}
        </div>
    );
}
