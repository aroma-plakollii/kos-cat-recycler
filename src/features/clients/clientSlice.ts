import { createSlice, PayloadAction}  from '@reduxjs/toolkit';
import {Client, ClientPaged} from "../../types/client";

const initialState: Client[] = [];

const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setClients: (state, action: PayloadAction<Client[]>) => {
            return action.payload;
        },
    }
});

export const {setClients} = clientSlice.actions;

export default clientSlice.reducer;