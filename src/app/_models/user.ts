import { Role } from "./role";

export class User {
    id!: number;
    firstName!: string;
    lastName!: string;
    username!: string;
    role!: Role;
    token?: string;
    groups!: Array<Number>;
    disciplines?: Array<Number>;
}
