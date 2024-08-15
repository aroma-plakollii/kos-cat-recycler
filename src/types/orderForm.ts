import {Client} from "./client";
import {User} from "./user";

export interface OrderForm {
    operation: string,
    clients: Client[],
    users: User[]
}