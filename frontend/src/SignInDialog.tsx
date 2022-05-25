import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomTextField from "./CustomTextField";
import { FetchService } from "./FetchService";
import { PageRoutes } from "./Routes";

export function SignInDialog() {
    const navigate = useNavigate();

    const loginUser = () => {
        const inputName = document.getElementById("Name") as HTMLInputElement | null;
        const inputPassword = document.getElementById("Password") as HTMLInputElement | null;

        if (inputName && inputPassword) {
            const name = inputName.value;
            const password = inputPassword.value;

            const jsonBody = { name: name, password: password };

            // Route für POST und JSON-Objekt übergeben, um das Objekt an diese URL zu schicken
            FetchService.post("http://localhost:8080/signIn", jsonBody)
                .then((response) => console.log(response))
                .catch((reason) => console.error(reason));
        }
    };
    const getResource = () => {
        FetchService.get("http://localhost:8080/some-protected-resource")
            .then((responseAsJson) => console.log(responseAsJson))
            .catch((reason) => console.error(reason));
    };

    return (
        <div className="signUpInContainer">
            <div className="signUpInContainerInner">
                <Typography variant="h5" className="signUpInItems" id="heading">
                    Einloggen
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
                    onClick={loginUser}
                    sx={{ color: "secondaryFont.main" }}
                >
                    Einloggen
                </Button>
                <Button
                    color="primaryButton"
                    variant="contained"
                    className="signUpInItems"
                    onClick={getResource}
                    sx={{ color: "secondaryFont.main" }}
                >
                    Get
                </Button>
                <div className="block">
                    <Typography className="separator">oder</Typography>
                </div>
                <Button
                    color="fontWhite"
                    variant="contained"
                    className="signUpInItems"
                    onClick={() => navigate(PageRoutes.signUp)}
                    sx={{ color: "secondaryFont.main" }}
                >
                    Registrieren
                </Button>
            </div>
        </div>
    );
}
