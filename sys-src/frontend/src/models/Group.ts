import { Person } from "./Person";

export interface Group {
    id: number;
    name: string;
    group_users: Person[];
}
