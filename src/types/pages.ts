export interface Page {
    name: string;
    url: string;
    hasAuthorization: boolean;
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
}