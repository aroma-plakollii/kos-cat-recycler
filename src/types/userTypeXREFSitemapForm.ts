import {UserType} from "./userType";
import {Sitemap} from "./sitemap";

export interface userTypeXREFSitemapForm {
    operation: string,
    userTypes: UserType[],
    sitemaps: Sitemap[]
}