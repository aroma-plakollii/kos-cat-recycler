export interface UserPermission {
    pageName: string;
    permissionType: 'create' | 'read' | 'update' | 'destroy';
}