import { Repayment } from "./models/Repayment";
import { Transaction } from "./models/Transaction";
import { Person } from "./models/Person";

// The algorithm is based on the following post.
// https://stackoverflow.com/questions/877728/what-algorithm-to-use-to-determine-minimum-number-of-actions-required-to-get-the/

interface RepaymentId {
    from: number;
    to: number;
    amount: number;
}

export function calculateRepayments(transactions: Transaction[]): Repayment[] {
    const balances = new Map<number, number>();
    const people = new Map<number, Person>();
    const repayments: Repayment[] = [];
    const repaymentsIds: RepaymentId[] = [];

    // get the people who are involved in the transactions
    for (let transaction of transactions) {
        people.set(transaction.creditor.id, transaction.creditor);
        for (let debtor of transaction.debtors) {
            people.set(debtor.id, debtor);
        }
    }

    // initialize the balance for each person
    for (const personId of people.keys()) {
        balances.set(personId, 0);
    }

    // calculate the balances
    for (let transaction of transactions) {
        // A transaction without debtors has no impact on the balances.
        if (transaction.debtors.length > 0) {
            let amountDebtor: number = transaction.amount / transaction.debtors.length;

            let debtorIds: number[] = transaction.debtors.map((debtor) => debtor.id);

            // set the balance for the creditor
            let prevBalance: number = balances.get(transaction.creditor.id)!;

            // The balance of the creditor depends on whether he/she is also a debtor.
            if (debtorIds.includes(transaction.creditor.id)) {
                balances.set(transaction.creditor.id, prevBalance + transaction.amount - amountDebtor);
            } else {
                balances.set(transaction.creditor.id, prevBalance + transaction.amount);
            }

            // set the balances for each debtor
            for (let debtor of transaction.debtors) {
                // If the debtor is also the creditor, then his/her balance has already been set.
                if (debtor.id !== transaction.creditor.id) {
                    prevBalance = balances.get(debtor.id)!;
                    balances.set(debtor.id, prevBalance - amountDebtor);
                }
            }
        }
    }

    // remove all balances that are already wiped out
    for (const personId of people.keys()) {
        let roundBalance: number = parseFloat(balances.get(personId)!.toFixed(2));
        if (roundBalance === 0.0) {
            balances.delete(personId);
        } else {
            balances.set(personId, roundBalance);
        }
    }

    // calculate the repayments until two balances are left
    while (balances.size > 2) {
        let checkTwo: boolean = false;

        // If two balances can be wiped out, then wipe them out.
        for (const [personId1, balance1] of balances) {
            for (const [personId2, balance2] of balances) {
                if (personId1 !== personId2) {
                    // check if a positive balance has a matching negative balance
                    if (balance1 === -balance2) {
                        if (balance1 > balance2) {
                            repaymentsIds.push({ from: personId2, to: personId1, amount: balance1 });
                        } else {
                            repaymentsIds.push({ from: personId1, to: personId2, amount: balance2 });
                        }

                        balances.delete(personId1);
                        balances.delete(personId2);
                        checkTwo = true;
                        break;
                    }
                }
            }
            if (checkTwo) break;
        }

        // If only one balance can be wiped out, then wipe the biggest negative balance out.
        if (!checkTwo) {
            let maxNegBalance: number = Number.NEGATIVE_INFINITY;
            let maxNegPersonId: number = -1;

            let minPosBalance: number = Number.POSITIVE_INFINITY;
            let minPosPersonId: number = -1;

            for (const [personId, balance] of balances) {
                // find the biggest negative balance
                if (balance < 0) {
                    if (balance > maxNegBalance) {
                        maxNegBalance = balance;
                        maxNegPersonId = personId;
                    }
                }
                // find the smallest positive balance
                else {
                    if (balance < minPosBalance) {
                        minPosBalance = balance;
                        minPosPersonId = personId;
                    }
                }
            }

            // add the value of the biggest negative balance to the smallest positive balance
            let oldBalance: number = balances.get(minPosPersonId)!;
            let newBalance: number = oldBalance + maxNegBalance;
            let roundNewBalance: number = parseFloat(newBalance.toFixed(2));
            balances.set(minPosPersonId, roundNewBalance);

            repaymentsIds.push({ from: maxNegPersonId, to: minPosPersonId, amount: -maxNegBalance });
            balances.delete(maxNegPersonId);
        }
    }

    // wipe the two remaining balances out
    if (balances.size === 2) {
        let [firstPersonId, firstBalance]: number[] = [...balances][0];
        let [secondPersonId, secondBalance]: number[] = [...balances][1];

        if (firstBalance > secondBalance) {
            repaymentsIds.push({ from: secondPersonId, to: firstPersonId, amount: firstBalance });
        } else {
            repaymentsIds.push({ from: firstPersonId, to: secondPersonId, amount: secondBalance });
        }
    }

    // set the people in the repayments according to their ids
    for (let repaymentId of repaymentsIds) {
        let roundAmount: number = parseFloat(repaymentId.amount.toFixed(2));
        repayments.push({
            from: people.get(repaymentId.from)!,
            to: people.get(repaymentId.to)!,
            amount: roundAmount,
        });
    }

    return repayments;
}
