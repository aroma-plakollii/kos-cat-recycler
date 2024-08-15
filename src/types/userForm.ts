import { UserType } from "./userType";

export interface UserForm {
    operation: string,
    userTypes: UserType[]
}