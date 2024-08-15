import {Country} from "./country";
import {Municipality} from "./municipality";
import {User} from "./user";

export interface ClientForm {
    operation: string,
    countries: Country[],
    municipalities: Municipality[],
    users: User[]
}