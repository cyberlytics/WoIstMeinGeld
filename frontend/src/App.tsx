import { Button, Typography } from "@mui/material";
import { useState } from "react";

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

        const params = new URLSearchParams();
        params.append("name", message.message);

        fetch("http://localhost:8080/addPerson", {
            method: "POST",
            body: params.toString(),
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
            .then((response) => response.json())
            .then((responseAsJson) => console.log(responseAsJson))
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
        </div>
    );
}
