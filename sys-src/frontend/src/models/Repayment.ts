import { Person } from "./Person";

export interface Repayment {
    from: Person;
    to: Person;
    amount: number;
}
