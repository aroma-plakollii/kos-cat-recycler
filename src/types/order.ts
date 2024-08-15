import {User} from "./user";
import {Client} from "./client";

export interface Order {
    idOrder?: number;
    idClient?: Client;
    quantity?: number;
    price?: number;
    orderDate?: Date;
    type?: string;
    material?: string;
    kilogram?: number;
    totalPrice?: number;
    idUser?: User;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface OrderPaged {
    orders: Order[],
    totalPages: number;
}