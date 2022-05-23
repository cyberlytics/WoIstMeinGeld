import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { FetchService } from "./FetchService";
import { TransactionList } from "./components/TransactionList";

interface IMessage {
    message: string;
}

export function App() {
    const [message, setMessage] = useState<IMessage | null>(null);

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

    return (
        <div>
            <Button variant="contained" onClick={handleClick}>
                Lade Message
            </Button>
            <Typography>{message ? message.message : "Noch keine Message"}</Typography>
            <Button variant="contained" onClick={handleAddPerson}>
                Person hinzufügen
            </Button>
            <TransactionList />
        </div>
    );
}
