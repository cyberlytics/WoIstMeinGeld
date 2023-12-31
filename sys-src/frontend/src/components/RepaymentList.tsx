import { List, Typography } from "@mui/material";
import { useMemo } from "react";
import { Repayment } from "../models/Repayment";
import { Transaction } from "../models/Transaction";
import { calculateRepayments } from "../calculateRepayments";
import { RepaymentListItem } from "./RepaymentListItem";
import { RepaymentChart } from "./RepaymentChart";

interface Props {
    groupId: number;
    transactions: Transaction[];
    onReload(): void;
}

export function RepaymentList(props: Props) {
    const { groupId, transactions, onReload } = props;

    const repayments: Repayment[] = useMemo(() => {
        return calculateRepayments(transactions);
    }, [transactions]);

    return repayments.length ? (
        <>
            <List>
                {repayments.map((repayment) => (
                    <RepaymentListItem
                        key={repayment.from.id + "" + repayment.to.id}
                        groupId={groupId}
                        repayment={repayment}
                        onReload={onReload}
                    />
                ))}
            </List>
            <RepaymentChart repayments={repayments} />
        </>
    ) : (
        <Typography variant="h5" align="center" style={{ padding: 20 }}>
            Keine Rückzahlungen nötig
        </Typography>
    );
}
