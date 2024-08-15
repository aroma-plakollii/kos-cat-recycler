import { createSlice, PayloadAction}  from '@reduxjs/toolkit';
import {Order} from "../../types/order";

const initialState: Order[] = [];

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<Order[]>) => {
            return action.payload;
        },
        resetOrders: (state) => {
            return [];
        },
    }
});

export const {setOrders, resetOrders} = orderSlice.actions;

export default orderSlice.reducer;