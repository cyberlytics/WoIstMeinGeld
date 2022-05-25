import { Button, Typography } from "@mui/material";
import CustomTextField from "./CustomTextField";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "./Routes";
import { FetchService } from "./FetchService";

export function SignUpDialog() {
    const navigate = useNavigate();

    const registerUser = () => {
        const inputName = document.getElementById("Name") as HTMLInputElement | null;
        const inputPassword = document.getElementById("Password") as HTMLInputElement | null;

        if (inputName && inputPassword) {
            const name = inputName.value;
            const password = inputPassword.value;

            const jsonBody = { name: name, password: password };

            // Route für POST und JSON-Objekt übergeben, um das Objekt an diese URL zu schicken
            FetchService.post("http://localhost:8080/signUp", jsonBody)
                .then((response) => console.log(response))
                .catch((reason) => console.error(reason));
        }
    };

    return (
        <div className="signUpInContainer">
            <div className="signUpInContainerInner">
                <Typography variant="h5" className="signUpInItems" id="heading">
                    Registrieren
                </Typography>
                <CustomTextField
                    id="Name"
                    color="primaryButton"
                    variant="outlined"
                    label="Name"
                    className="signUpInItems"
                />
                <CustomTextField id="Password" label="Passwort" type="password" className="signUpInItems" />
                <Button
                    color="primaryButton"
                    variant="contained"
                    className="signUpInItems"
                    onClick={registerUser}
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
