import {Client} from "./client";

export interface SaleForm {
    operation: string,
    clients: Client[];
}