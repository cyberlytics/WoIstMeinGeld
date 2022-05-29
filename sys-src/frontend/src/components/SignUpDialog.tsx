import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../Routes";
import { FetchService } from "../FetchService";
import { useState } from "react";

export function SignUpDialog() {
    const navigate = useNavigate();
    const [errorText, setErrorText] = useState("");
    const [isValidInput, setIsValidInput] = useState(true);
    const checkResponse = (response: any) => {
        response = response[0]["msg"];
        if (response.includes("409")) {
            setIsValidInput(false);
            setErrorText("Nutzername bereits vergeben!");
        } else {
            setIsValidInput(true);
            setErrorText("");
        }
    };

    const registerUser = () => {
        const inputName = document.getElementById("Name") as HTMLInputElement | null;
        const inputPassword = document.getElementById("Password") as HTMLInputElement | null;

        if (inputName && inputPassword) {
            const name = inputName.value;
            const password = inputPassword.value;

            const jsonBody = { name: name, password: password };

            // Route für POST und JSON-Objekt übergeben, um das Objekt an diese URL zu schicken
            FetchService.post("http://localhost:8080/signUp", jsonBody)
                .then((response) => checkResponse(response))
                .catch((reason) => console.error(reason));
        }
    };

    return (
        <div className="signUpInContainer">
            <div className="signUpInContainerInner">
                <Typography variant="h5" className="signUpInItems" id="heading">
                    Registrieren
                </Typography>
                <TextField
                    id="Name"
                    variant="outlined"
                    label="Name"
                    className="signUpInItems"
                    helperText={errorText}
                    error={!isValidInput}
                />
                <TextField id="Password" label="Passwort" type="password" className="signUpInItems" />
                <Button variant="contained" className="signUpInItems" onClick={registerUser}>
                    Registrieren
                </Button>
                <Typography className="separator">oder</Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    className="signUpInItems"
                    onClick={() => navigate(PageRoutes.signIn)}
                >
                    Einloggen
                </Button>
            </div>
        </div>
    );
}
