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

export function repay_algo(transactions: Transaction[]): Repayment[] {
    const balances = new Map<number, number>();
    const repaymentsIds: RepaymentId[] = [];
    const repayments: Repayment[] = [];

    // TODO: people as function parameter
    const people: Person[] = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
        { id: 4, name: "Dave" },
    ];
    const peopleMap = new Map<number, Person>();

    // initialize the balances and the people map
    for (let person of people) {
        peopleMap.set(person.id, person);
        balances.set(person.id, 0);
    }

    // calculate the balances
    for (let transaction of transactions) {
        if (transaction.debtors.length > 0) {
            let amountDebtor: number = transaction.amount / transaction.debtors.length;

            let debtorIds: number[] = transaction.debtors.map((debtor) => debtor.id);

            // set the balance for the creditor
            let prevBalance: number = balances.get(transaction.creditor.id)!;
            if (debtorIds.includes(transaction.creditor.id)) {
                balances.set(transaction.creditor.id, prevBalance + transaction.amount - amountDebtor);
            } else {
                balances.set(transaction.creditor.id, prevBalance + transaction.amount);
            }

            // set the balances for each debtor
            for (let debtor of transaction.debtors) {
                if (debtor.id !== transaction.creditor.id) {
                    let prevBalance: number = balances.get(debtor.id)!;
                    balances.set(debtor.id, prevBalance - amountDebtor);
                }
            }
        }
    }

    // remove all balances that are already wiped out
    for (let person of people) {
        if (balances.get(person.id) === 0) {
            balances.delete(person.id);
        }
    }

    // calculate the repayments
    while (balances.size > 0) {
        let checkTwo: boolean = false;

        // If two balances can be wiped out, then wipe them out.
        for (const [personId1, balance1] of balances) {
            for (const [personId2, balance2] of balances) {
                if (balance1 === -balance2) {
                    if (balance1 > balance2) repaymentsIds.push({ from: personId2, to: personId1, amount: balance1 });
                    else repaymentsIds.push({ from: personId1, to: personId2, amount: balance2 });

                    balances.delete(personId1);
                    balances.delete(personId2);
                    checkTwo = true;
                    break;
                }
            }
            if (checkTwo) break;
        }

        // If only one balance can be wiped out, then wipe the biggest negative balance out.
        // The value of the biggest negative balance will be added to the smallest positive balance.
        if (!checkTwo) {
            let maxNegBalance: number = Number.NEGATIVE_INFINITY;
            let maxNegPersonId: number = 0;

            let minPosBalance: number = Number.POSITIVE_INFINITY;
            let minPosPersonId: number = 0;

            for (const [personId, balance] of balances) {
                if (balance < 0) {
                    if (balance > maxNegBalance) {
                        maxNegBalance = balance;
                        maxNegPersonId = personId;
                    }
                } else {
                    if (balance < minPosBalance) {
                        minPosBalance = balance;
                        minPosPersonId = personId;
                    }
                }
            }

            repaymentsIds.push({ from: maxNegPersonId, to: minPosPersonId, amount: maxNegBalance });
            balances.delete(maxNegPersonId);
        }
    }

    // set the people in the repayments according to the people map
    for (let repaymentId of repaymentsIds) {
        repayments.push({
            from: peopleMap.get(repaymentId.from)!,
            to: peopleMap.get(repaymentId.to)!,
            amount: repaymentId.amount,
        });
    }

    return repayments;
}
