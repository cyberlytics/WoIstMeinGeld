import { useTheme } from "@mui/material";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import { formatMoney } from "../format/formatMoney";
import { Repayment } from "../models/Repayment";

interface Props {
    repayments: Repayment[];
}

export function RepaymentChart(props: Props) {
    const { repayments } = props;

    const [activePiePice, setActivePiePice] = useState(0);
    const {
        palette,
        typography: { fontFamily, fontSize },
    } = useTheme();

    return (
        <div id={"repayment-chart"}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={repayments.map((r) => Object.assign(r, { palette, fontFamily, fontSize }))}
                        nameKey={(repayment: Repayment) => repayment.from.name}
                        dataKey={"amount"}
                        innerRadius={"45%"}
                        outerRadius={"70%"}
                        activeIndex={activePiePice}
                        onMouseEnter={(_, i) => setActivePiePice(i)}
                        activeShape={renderActiveShape}
                        paddingAngle={3}
                    >
                        {repayments.map((r, i) => (
                            <Cell key={`slice-${i}`} fill={palette.foregroundGray.main} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

/**
 * Original code from https://github.com/recharts/recharts/blob/86d4d563b8fa213373c56646367185e4adefbbee/demo/component/PieChart.tsx
 * @param props rechart specific
 * @returns jsx svg g element
 */
const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <text
                x={cx}
                y={cy}
                dy={8}
                fontFamily={payload.fontFamily}
                textAnchor="middle"
                fill={payload.palette.fontWhite.main}
            >
                {formatMoney(payload.amount)}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={payload.palette.primaryButton.main}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={payload.palette.primaryButton.main} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={payload.palette.primaryButton.main} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey + payload.fontSize * 0.3}
                fontFamily={payload.fontFamily}
                textAnchor={textAnchor}
                fill={payload.palette.fontWhite.main}
            >
                {`${payload.from?.name} schuldet ${payload.to?.name}`}
            </text>
        </g>
    );
};
