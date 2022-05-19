import { Button, Typography } from "@mui/material";
import { useState } from "react";
import AppBar from "./AppBar";
import postFetch from "./postFetchWrapper";
import { SignUpDialog } from "./SignUp";

interface IMessage {
    message: string;
}

export function App() {
    const [message, setMessage] = useState<IMessage | null>(null);

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

    return (
        <div>
            <AppBar />
            <Button variant="contained" onClick={handleClick}>
                Lade Message
            </Button>
            <Typography>{message ? message.message : "Noch keine Message"}</Typography>
            <Button variant="contained" onClick={handleAddPerson}>
                Person hinzufügen
            </Button>
            <SignUpDialog show={false}></SignUpDialog>
        </div>
    );
}
