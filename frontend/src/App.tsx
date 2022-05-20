import { Button, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import AppBar from "./AppBar";
import postFetch from "./postFetchWrapper";
import { PageRoutes } from "./Routes";
import { SignInDialog } from "./SignInDialog";
import { SignUpDialog } from "./SignUpDialog";
import theme from "./ThemeProvider";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

interface IMessage {
    message: string;
}

export function App() {
    const [message, setMessage] = useState<IMessage | null>(null);
    const [showLogin, setShowLogin] = useState<boolean>(true);

    function handleClick() {
        fetch("http://localhost:8080/")
            .then((response) => response.json())
            .then((responseAsJson) => setMessage(responseAsJson))
            .catch((reason) => console.error(reason));
    }

    function handleAddPerson() {
        if (!message) {
            return;
        }

        const jsonBody = JSON.stringify({ name: message.message });

        // Route für POST und JSON-Objekt übergeben, um das Objekt an diese URL zu schicken
        postFetch("http://localhost:8080/addPerson", jsonBody)
            .then((response) => response.json())
            .then((responseAsJson) => console.log(responseAsJson))
            .catch((reason) => console.error(reason));
    }

    const handleShow = (show: boolean) => {
        setShowLogin(show);
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <AppBar />
                {/* <Button variant="contained" onClick={handleClick}>
                    Lade Message
                </Button>
                <Typography>{message ? message.message : "Noch keine Message"}</Typography>
                <Button variant="contained" onClick={handleAddPerson}>
                    Person hinzufügen
                </Button> */}
                <BrowserRouter>
                    <Routes>
                        <Route path={PageRoutes.signIn} element={<SignInDialog />} />
                        <Route path={PageRoutes.signUp} element={<SignUpDialog />} />
                        <Route path={PageRoutes.home} element={<SignInDialog />} />
                        <Route path={PageRoutes.default} element={<Navigate to={PageRoutes.signIn} replace />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}
