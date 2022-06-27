import { Repayment } from "./models/Repayment";
import { Transaction } from "./models/Transaction";
import { calculateRepayments } from "./calculateRepayments";
import { FetchService } from "./FetchService";

export async function checkOpenRepayments(groupId: number): Promise<boolean> {
    const hasOpenRepayments = true;
    const transactions = await FetchService.get("http://localhost:8080/transactions/" + groupId)
        .then((response) => response.json())
        .then((transactions: Transaction[]) => transactions)
        .catch((reason) => console.error(reason));

    if (transactions) {
        const repayments: Repayment[] = await calculateRepayments(transactions);
        return repayments.find((repayment: Repayment) => repayment.amount > 0) ? true : false;
    }

    return hasOpenRepayments;
}
