import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchService } from "../FetchService";
import { PageRoutes } from "../Routes";
import TitleAppBar from "./AppBar";

export function SignInDialog() {
    const navigate = useNavigate();
    const [nameErrorText, setNameErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("");
    const [isValidName, setIsValidName] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const checkResponse = (response: any) => {
        if (response.token !== undefined) {
            setPasswordErrorText("");
            setNameErrorText("");
            setIsValidName(true);
            setIsValidPassword(true);
            return;
        }
        const responseCode = response[0]["msg"];
        if (responseCode.includes("404")) {
            setIsValidPassword(true);
            setPasswordErrorText("");
            setIsValidName(false);
            setNameErrorText("Ungültiger Nutzername!");
        } else if (responseCode.includes("401")) {
            setIsValidName(true);
            setNameErrorText("");
            setIsValidPassword(false);
            setPasswordErrorText("Ungültiges Passwort!");
        } else {
            setPasswordErrorText("");
            setNameErrorText("");
            setIsValidName(true);
            setIsValidPassword(true);
        }
    };

    const loginUser = () => {
        const inputName = document.getElementById("Name") as HTMLInputElement | null;
        const inputPassword = document.getElementById("Password") as HTMLInputElement | null;

        if (inputName && inputPassword) {
            const name = inputName.value;
            const password = inputPassword.value;

            const jsonBody = { name: name, password: password };

            // Route für POST und JSON-Objekt übergeben, um das Objekt an diese URL zu schicken
            FetchService.post("http://localhost:8080/signIn", jsonBody)
                .then((response) => response.json())
                .then((response) => checkResponse(response))
                .catch((reason) => console.error(reason));
        }
    };

    return (
        <>
            <TitleAppBar />
            <div className="signUpInContainer">
                <div className="signUpInContainerInner">
                    <Typography variant="h5" className="signUpInItems" id="heading">
                        Einloggen
                    </Typography>
                    <TextField
                        id="Name"
                        variant="outlined"
                        label="Name"
                        className="signUpInItems"
                        helperText={nameErrorText}
                        error={!isValidName}
                    />
                    <TextField
                        id="Password"
                        label="Passwort"
                        type="password"
                        className="signUpInItems"
                        helperText={passwordErrorText}
                        error={!isValidPassword}
                    />
                    <Button role="signInButton" variant="contained" className="signUpInItems" onClick={loginUser}>
                        Einloggen
                    </Button>
                    <Typography className="separator">oder</Typography>
                    <Button
                        role="signInButton"
                        variant="contained"
                        color="secondary"
                        className="signUpInItems"
                        onClick={() => navigate(PageRoutes.signUp)}
                    >
                        Registrieren
                    </Button>
                </div>
            </div>
        </>
    );
}
