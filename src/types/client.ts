import { Country } from "./country";
import { Municipality } from "./municipality";
import {User} from "./user";

export interface Client {
    idClient?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    place?: string;
    nationalId?: string;
    digitalSignature?: string;
    idCountry?: Country;
    idMunicipality?: Municipality;
    idUser?: User;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ClientPaged {
    clients: Client[],
    totalPages: number;
}