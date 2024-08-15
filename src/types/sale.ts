import {Client} from "./client";

export interface Sale {
    idSale?: number;
    saleNumber?: string;
    date?: Date;
    description?: string;
    quantity?: number;
    price?: number;
    totalPrice?: number;
    kilogram?: number;
    idClient?: Client;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SalePaged {
    sales: Sale[],
    totalPages: number;
}