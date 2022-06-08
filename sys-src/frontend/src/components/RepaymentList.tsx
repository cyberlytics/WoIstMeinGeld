import { List, Typography } from "@mui/material";
import { useMemo } from "react";
import { Group } from "../models/Group";
import { Repayment } from "../models/Repayment";
import { Transaction } from "../models/Transaction";
import { repay_algo } from "../repayment_algorithm";
import { RepaymentListItem } from "./RepaymentListItem";

interface Props {
    group: Group;
    transactions: Transaction[];
    onReload(): void;
}

export function RepaymentList(props: Props) {
    const { group, transactions, onReload } = props;

    const repayments: Repayment[] = useMemo(() => {
        return repay_algo(transactions);
    }, []);

    return repayments.length ? (
        <List>
            {repayments.map((repayment) => (
                <RepaymentListItem
                    key={repayment.from.id + "" + repayment.to.id}
                    group={group}
                    repayment={repayment}
                    onReload={onReload}
                />
            ))}
        </List>
    ) : (
        <Typography variant="h5" align="center" style={{ padding: 20 }}>
            Keine Rückzahlungen nötig
        </Typography>
    );
}
