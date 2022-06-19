import { useTheme } from "@mui/material";
import { useState } from "react";
import { Cell, ResponsiveContainer } from "recharts";
import { formatMoney } from "../format/formatMoney";
import { Repayment } from "../models/Repayment";

interface Props {
    repayments: Repayment[];
}

export function RepaymentChart(props: Props) {
    const { repayments } = props;

    const {
        palette,
        typography: { fontFamily, fontSize },
    } = useTheme();

    return <div id={"repayment-chart"}></div>;
}
