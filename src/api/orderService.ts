import axios from "axios";
import { API_URL } from "../config";
import {getHeaders} from "../helpers/getHeaders";
import {Order, OrderPaged} from "../types/order";
import {OrderForm} from "../types/orderForm";
import {ClientPaged} from "../types/client";

export const orderGetAll = async (headers: any): Promise<Order[]> => {
    try {
        const res = await axios.get(`${API_URL}/orders`,{headers});

        return res.data.orders;
    } catch (error) {
        throw new Error('Failed getting orders.');
    }
}

export const orderGetAllPaged = async (page: number, headers: any): Promise<OrderPaged> => {
    try {
        const res = await axios.get(`${API_URL}/orders/paged/${page}`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting clients.');
    }
}

export const orderGetSingle = async (idOrder: number, headers: any): Promise<Order> => {
    try{
        const res = await axios(`${API_URL}/orders/${idOrder}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get order')
    }
}

export const orderCreate = async (orderData: Order, headers: any): Promise<Order> => {
    try {
        const res = await axios.post(`${API_URL}/orders/create`, orderData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to create order.');
    }
}

export const orderUpdate = async (idOrder: number, orderData: Order, headers: any): Promise<Order> => {
    try {
        const res = await axios.put(`${API_URL}/orders/${idOrder}`, orderData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to update order.');
    }
}

export const orderDelete = async (idOrder: number | undefined, headers: any): Promise<Order> => {
    try{
        const res = await axios.delete(`${API_URL}/orders/${idOrder}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to delete order')
    }
}

export const getCreateForm = async (headers: any, ): Promise<OrderForm> => {
    try {
        const res = await axios.get<OrderForm>(`${API_URL}/orders/create`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting order create form.');
    }
}

export const getUpdateForm = async (headers: any): Promise<OrderForm> => {
    try {
        const res = await axios.get<OrderForm>(`${API_URL}/orders/update`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting order update form.');
    }
}

export const getOrdersByClient = async (idClient: number, headers: any): Promise<Order[]> => {
    try{
        const res = await axios(`${API_URL}/orders/clients/${idClient}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get order')
    }
}

export const getOrdersByClientPaged = async (idClient: number | undefined, data: any, headers: any): Promise<OrderPaged> => {
    try{
        const res = await axios.post(`${API_URL}/orders/clients/paged/${idClient}`, data, {headers})
        return res.data;
    }catch(error) {
        throw new Error('Failed to get clients')
    }
}

export const getOrdersByYear = async (orderData: any, headers: any): Promise<Order[]> => {
    try {
        const res = await axios.post(`${API_URL}/orders/year`, orderData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to get order.');
    }
}

export const getOrdersByDate = async (orderData: any, headers: any): Promise<Order[]> => {
    try {
        const res = await axios.post(`${API_URL}/orders/date`, orderData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to get order.');
    }
}

export const getOrdersByDateAndClient = async (orderData: any, headers: any): Promise<Order[]> => {
    try {
        const res = await axios.post(`${API_URL}/orders/date-client`, orderData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to get order.');
    }
}

export const getOrdersByUser = async (idUser: number | undefined, headers: any): Promise<Order[]> => {
    try{
        const res = await axios(`${API_URL}/orders/users/${idUser}`, {headers})
        return res.data.orders
    }catch(error) {
        throw new Error('Failed to get order')
    }
}

export const getOrdersByUserPaged = async (idUser: number | undefined, data: any, headers: any): Promise<OrderPaged> => {
    try{
        const res = await axios.post(`${API_URL}/orders/users/paged/${idUser}`, data, {headers})
        return res.data;
    }catch(error) {
        throw new Error('Failed to get orders')
    }
}