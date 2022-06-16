import { List, Typography } from "@mui/material";
import { useMemo } from "react";
import { Group } from "../models/Group";
import { Repayment } from "../models/Repayment";
import { Transaction } from "../models/Transaction";
import { calculateRepayments } from "../calculateRepayments";
import { RepaymentListItem } from "./RepaymentListItem";
import { PieChart, Pie, Legend, ResponsiveContainer } from "recharts";

interface Props {
    groupId: number;
    transactions: Transaction[];
    onReload(): void;
}

export function RepaymentList(props: Props) {
    const { groupId, transactions, onReload } = props;

    const repayments: Repayment[] = useMemo(() => {
        return calculateRepayments(transactions);
    }, []);

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
            <PieChart width={300} height={300}>
                <Pie
                    data={repayments}
                    nameKey={(repayment: Repayment) => repayment.from.name}
                    dataKey={"amount"}
                    innerRadius={60}
                    outerRadius={100}
                />
                <Legend />
            </PieChart>
        </>
    ) : (
        <Typography variant="h5" align="center" style={{ padding: 20 }}>
            Keine Rückzahlungen nötig
        </Typography>
    );
}
