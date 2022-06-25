import { Repayment } from "./models/Repayment";
import { Transaction } from "./models/Transaction";
import { calculateRepayments } from "./calculateRepayments";
import { FetchService } from "./FetchService";

export async function checkOpenRepaymentsPerson(groupId: number, personId: number): Promise<number> {
    const personHasOpenRepayments = 4;
    //check if there are any open Repayments in the group
    const transactions = await FetchService.get("http://localhost:8080/transactions/" + groupId)
        .then((response) => response.json())
        .then((transactions: Transaction[]) => transactions)
        .catch((reason) => console.error(reason));

    if (transactions) {
        const repayments: Repayment[] = await calculateRepayments(transactions);
        //check if person appears in Transactions either as creditor or debtor
        if (repayments.find((repayment: Repayment) => repayment.from.id == personId) ? true : false) {
            return 1;
        }
        if (repayments.find((repayment: Repayment) => repayment.to.id == personId) ? true : false) {
            return 2;
        }
        return 0;
    }

    return personHasOpenRepayments;
}
