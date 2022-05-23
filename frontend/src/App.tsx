import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { Transaction } from "./models/Transaction";
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

    const sampleTransaction1: Transaction = {
        id: 1,
        description: "Burger essen",
        creditor_id: 2,
        amount: 30,
        time: "2022-05-23T11:39:51.316Z",
    };

    const sampleTransaction2: Transaction = {
        id: 2,
        description: "Pizza essen",
        creditor_id: 3,
        amount: 25,
        time: "2022-05-24T14:29:46.357Z",
    };

    const sampleTransactions: Transaction[] = [sampleTransaction1, sampleTransaction2];

    return (
        <div>
            <Button variant="contained" onClick={handleClick}>
                Lade Message
            </Button>
            <Typography>{message ? message.message : "Noch keine Message"}</Typography>
            <Button variant="contained" onClick={handleAddPerson}>
                Person hinzufügen
            </Button>
            <TransactionList transactions={sampleTransactions} />
        </div>
    );
}
