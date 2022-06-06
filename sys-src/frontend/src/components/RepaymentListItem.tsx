import { Button, ListItem, ListItemText, Typography } from "@mui/material";
import { formatMoney } from "../format/formatMoney";
import { Repayment } from "../models/Repayment";

interface Props {
    repayment: Repayment;
}

export function RepaymentListItem(props: Props) {
    const { repayment } = props;

    return (
        <ListItem
            divider
            secondaryAction={
                <div style={{ display: "flex", alignItems: "center", gap: 64 }}>
                    <Typography>{formatMoney(repayment.amount)}</Typography>
                    <Button variant="contained">Begleichen</Button>
                </div>
            }
        >
            <ListItemText primary={repayment.from.name} secondary={`schuldet ${repayment.to.name}`} />
        </ListItem>
    );
}
