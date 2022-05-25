import { Button, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
<<<<<<< HEAD
import { FetchService } from "./FetchService";
import { TransactionList } from "./components/TransactionList";
=======
import AppBar from "./AppBar";
import postFetch from "./postFetchWrapper";
import { PageRoutes } from "./Routes";
import { SignInDialog } from "./SignInDialog";
import { SignUpDialog } from "./SignUpDialog";
import theme from "./ThemeProvider";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
>>>>>>> 1-Peter-Meter-SignUp-Page

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
        FetchService.post<IMessage>("http://localhost:8080/addPerson", { name: message.message })
            .then((response) => console.log(response))
            .catch((reason) => console.error(reason));
    }

    const handleShow = (show: boolean) => {
        setShowLogin(show);
    };

    return (
        <div>
<<<<<<< HEAD
            <Button variant="contained" onClick={handleClick}>
                Lade Message
            </Button>
            <Typography>{message ? message.message : "Noch keine Message"}</Typography>
            <Button variant="contained" onClick={handleAddPerson}>
                Person hinzufügen
            </Button>
            <TransactionList />
=======
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
>>>>>>> 1-Peter-Meter-SignUp-Page
        </div>
    );
}
