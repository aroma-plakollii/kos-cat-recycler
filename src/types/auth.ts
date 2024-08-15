import { AuthUser } from "./authUser";
import { Page } from "./pages";

export interface Auth {
    isAuthenticated: boolean;
    user: AuthUser | null;
    token: string | null;
    pages: Page[];
    status: number;
}