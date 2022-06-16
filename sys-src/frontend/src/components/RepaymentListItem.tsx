import { Done, ErrorOutline, Reply } from "@mui/icons-material";
import { Button, CircularProgress, ListItem, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import { FetchService } from "../FetchService";
import { formatMoney } from "../format/formatMoney";
import { Repayment } from "../models/Repayment";

interface Props {
    groupId: number;
    repayment: Repayment;
    onReload(): void;
}

interface AddTransactionPayload {
    group_id: number;
    creditor_id: number;
    description: string;
    time: string;
    amount: number;
    debtors: number[];
}

type RepaymentState = "not-yet" | "processing" | "done" | "error";

export function RepaymentListItem(props: Props) {
    const { groupId, repayment, onReload } = props;
    const [state, setState] = useState<RepaymentState>("not-yet");

    function onRepay() {
        if (state !== "not-yet") {
            return;
        }

        setState("processing");

        const payload: AddTransactionPayload = {
            group_id: groupId,
            creditor_id: repayment.from.id,
            description: `Rückzahlung an ${repayment.to?.name}`,
            time: new Date().toISOString(),
            amount: repayment.amount,
            debtors: [repayment.to.id],
        };

        setTimeout(() => {
            FetchService.post("http://localhost:8080/createTransaction", payload)
                .then((response) => {
                    if (response.ok) {
                        setState("done");
                    } else {
                        throw Error(response.statusText);
                    }
                })
                .catch((reason) => {
                    console.error(reason);
                    setState("error");
                })
                .finally(onReload);
        }, 400); // backend is too fast for 'processing' state :)
    }

    function getButtonColor() {
        switch (state) {
            case "done":
                return "success";
            case "error":
                return "error";
            default:
                return "primary";
        }
    }

    function getButtonIcon() {
        switch (state) {
            case "done":
                return <Done color="inherit" />;
            case "error":
                return <ErrorOutline color="inherit" />;
            case "processing":
                return <CircularProgress color="inherit" size="1em" />;
            default:
                return <Reply />;
        }
    }

    return (
        <ListItem
            divider
            secondaryAction={
                <div style={{ display: "flex", alignItems: "center", gap: 64 }}>
                    <Typography>{formatMoney(repayment.amount)}</Typography>
                    <Button variant="contained" onClick={onRepay} color={getButtonColor()} startIcon={getButtonIcon()}>
                        Begleichen
                    </Button>
                </div>
            }
        >
            <ListItemText primary={repayment.from?.name} secondary={`schuldet ${repayment.to?.name}`} />
        </ListItem>
    );
}
