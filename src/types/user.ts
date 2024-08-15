import { UserType } from "./userType";

export interface User {
    idUser?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    idUserType?: UserType
}

export interface UserPaged {
    users: User[],
    totalPages: number;
}