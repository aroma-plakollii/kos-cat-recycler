import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Page } from "../types/pages";

export const useUserPermissions = (pageName: string) => {
    const pages = useSelector((state: RootState) => state.auth.pages);
  
    const pagePermissions: Page | undefined = pages?.find(page => page.name === pageName) as Page;

    const defaultPermissions = {
      hasAuthorization: false,
      canRead: false,
      canCreate: false,
      canUpdate: false,
      canDelete: false,
    };
  
    if (!pagePermissions) {
        return defaultPermissions;
    }
  
    return {
      hasAuthorization: !!pagePermissions.hasAuthorization,
      canRead: !!pagePermissions.read,
      canCreate: !!pagePermissions.create,
      canUpdate: !!pagePermissions.update,
      canDelete: !!pagePermissions.delete,
    };
};