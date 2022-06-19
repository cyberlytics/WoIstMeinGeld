import { useTheme } from "@mui/material";
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Sector, XAxis, YAxis } from "recharts";
import { formatMoney } from "../format/formatMoney";
import { Repayment } from "../models/Repayment";

interface Total {
    name: string;
    value: number;
}

interface Props {
    repayments: Repayment[];
}

export function RepaymentChart(props: Props) {
    const { repayments } = props;

    const {
        palette,
        typography: { fontFamily, fontSize },
    } = useTheme();

    // transform repayment data to show composed dept/ loan to the group
    const barData = repayments.reduce((totals: Total[], repayment): Total[] => {
        // from/ debtor
        let temp = totals.find((total) => total.name == repayment.from.name);
        if (temp) temp.value -= repayment.amount;
        else
            totals.push({
                name: repayment.from.name,
                value: repayment.amount * -1,
            });
        // to/ creditor
        temp = totals.find((total) => total.name == repayment.to.name);
        if (temp) temp.value += repayment.amount;
        else
            totals.push({
                name: repayment.to.name,
                value: repayment.amount,
            });
        return totals;
    }, []);

    return (
        <div id={"repayment-chart"}>
            <ResponsiveContainer width={"60%"}>
                <BarChart
                    data={barData.map((v) =>
                        Object.assign({}, v, { label: { value: v.value, palette, fontFamily, fontSize } })
                    )}
                    margin={{ top: 30, left: 5, bottom: 30, right: 5 }}
                >
                    <Bar dataKey={"value"}>
                        {barData.map((v, i) => (
                            <Cell
                                key={`slice-${i}`}
                                fill={v.value < 0 ? palette.badRed.main : palette.goodGreen.main}
                            />
                        ))}
                        <LabelList dataKey={"label"} content={renderCustomizedLabel} />
                    </Bar>
                    <XAxis dataKey={"name"} stroke={palette.notFilledGray.main} />
                    <YAxis stroke={palette.notFilledGray.main} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

/**
 * renderCustomizedLabel used by LabelList to render the exact amount as labels
 */
const renderCustomizedLabel = (props: any) => {
    const { x, y, width, height, value: payload } = props;
    const padding = 5;

    console.log(height);
    const hanging =
        (height < 0 && Math.abs(height) + 2 * padding < payload.fontSize) ||
        (0 < height && payload.fontSize < height + 2 * padding);

    return (
        <g>
            <text
                x={x + width / 2}
                y={hanging ? y + padding : y - padding}
                fontFamily={payload.fontFamily}
                fill={payload.palette.fontWhite.main}
                textAnchor="middle"
                dominantBaseline={hanging ? "hanging" : "text-top"}
            >
                {formatMoney(payload.value)}
            </text>
        </g>
    );
};
