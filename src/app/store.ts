import { configureStore} from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import userSlice from '../features/users/userSlice';
import clientSlice from "../features/clients/clientSlice";
import orderSlice from "../features/orders/orderSlice";
import sitemapSlice from "../features/sitemaps/sitemapSlice";
import userTypeXREFSitemapSlice from "../features/userTypeXREFSitemaps/userTypeXREFSitemapSlice";
import userTypeSlice from "../features/userTypes/userTypeSlice";
import saleSlice from "../features/sales/saleSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        users: userSlice,
        clients: clientSlice,
        orders: orderSlice,
        sales: saleSlice,
        sitemaps: sitemapSlice,
        userTypeXREFSitemaps: userTypeXREFSitemapSlice,
        userTypes: userTypeSlice
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {users: UsersState}
export type AppDispatch = typeof store.dispatch