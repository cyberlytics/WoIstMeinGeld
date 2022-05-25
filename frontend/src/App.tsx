import { Button, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import { FetchService } from "./FetchService";
import { TransactionList } from "./components/TransactionList";
import AppBar from "./AppBar";
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
        FetchService.get("http://localhost:8080/")
            .then((response) => setMessage(response))
            .catch((reason) => console.error(reason));
    }

    function handleAddPerson() {
        if (!message) {
            return;
        }

        // Route für POST und JSON-Objekt übergeben, um das Objekt an diese URL zu schicken
        FetchService.post("http://localhost:8080/addPerson", { name: message.message })
            .then((response) => console.log(response))
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
