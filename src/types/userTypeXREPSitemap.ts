import { Sitemap } from "./sitemap";
import { UserType } from "./userType";

export interface UserTypeXREFSitemap {
    idUserTypeXREFSitemap?: number;
    idUserType?: UserType;
    idSitemap?: Sitemap;
    hasAuthorization?: boolean;
    create?: boolean;
    read?: boolean;
    update?: boolean;
    destroy?: boolean;
}