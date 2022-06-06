import { List, Typography } from "@mui/material";
import { useMemo } from "react";
import { Group } from "../models/Group";
import { Repayment } from "../models/Repayment";
import { Transaction } from "../models/Transaction";
import { RepaymentListItem } from "./RepaymentListItem";

interface Props {
    group: Group;
    transactions: Transaction[];
    onReload(): void;
}

export function RepaymentList(props: Props) {
    const { group, transactions, onReload } = props;

    const repayments: Repayment[] = useMemo(() => {
        // demo algorithm to generate repayments

        if (transactions.length >= 3) {
            return [
                { from: transactions[0].creditor, to: transactions[2].creditor, amount: 13.37 },
                { from: transactions[1].creditor, to: transactions[0].creditor, amount: 2 },
                { from: transactions[2].creditor, to: transactions[1].creditor, amount: 25 },
            ];
        }

        return [];
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
