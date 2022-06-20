import { Person } from "./Person";

export interface Transaction {
    id: number;
    group_id: number;
    description: string;
    creditor_id: number;
    amount: number;
    time: string;
    creditor: Person;
    debtors: Person[];
}
