import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const useUserRole = () => {
    const user = useSelector((state: RootState) => state.auth.user);
  
    const isUserSuperAdmin = user?.userType === 'super-admin';
    const isUserAdmin = user?.userType === 'admin';
    const isUserAgent = user?.userType === 'agent';
  
    return { isUserSuperAdmin, isUserAdmin, isUserAgent };
};
  