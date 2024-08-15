import axios from "axios";
import { API_URL } from "../config";
import {Sale, SalePaged} from "../types/sale";
import {SaleForm} from "../types/saleForm";
import {ClientPaged} from "../types/client";

export const saleGetAll = async (headers: any): Promise<Sale[]> => {
    try {
        const res = await axios.get(`${API_URL}/sales`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting sales.');
    }
}

export const saleGetAllPaged = async (page: number, headers: any): Promise<SalePaged> => {
    try {
        const res = await axios.get(`${API_URL}/sales/paged/${page}`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting sales.');
    }
}


export const saleGetSingle = async (idSale: number, headers: any): Promise<Sale> => {
    try{
        const res = await axios(`${API_URL}/sales/${idSale}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get sale')
    }
}

export const saleCreate = async (saleData: Sale, headers: any): Promise<any> => {
    try {
        const res = await axios.post(`${API_URL}/sales/create`, saleData, { headers });
        return res.data;
    }catch (error: any) {
        throw new Error('Failed to create sale.', error.response.data);
    }
}

export const saleUpdate = async (idSale: number, saleData: Sale, headers: any): Promise<Sale> => {
    try {
        const res = await axios.put(`${API_URL}/sales/${idSale}`, saleData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to update sale.');
    }
}

export const saleDelete = async (idSale: number| undefined, headers: any): Promise<Sale> => {
    try{
        const res = await axios.delete(`${API_URL}/sales/${idSale}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to delete invoice')
    }
}

export const getCreateForm = async (headers: any): Promise<SaleForm> => {
    try {
        const res = await axios.get<SaleForm>(`${API_URL}/sales/create`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting sale create form.');
    }
}


export const getUpdateForm = async (headers: any): Promise<SaleForm> => {
    try {
        const res = await axios.get<SaleForm>(`${API_URL}/sales/update`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting sale update form.');
    }
}

export const saleGetByClient = async (idClient: number, headers: any): Promise<Sale[]> => {
    try{
        const res = await axios(`${API_URL}/sales/client/${idClient}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get sales')
    }
}

export const saleGetByClientPaged = async (idClient: number | undefined, data: any, headers: any): Promise<SalePaged> => {
    try{
        const res = await axios.post(`${API_URL}/sales/clients/paged/${idClient}`, data, {headers})
        return res.data;
    }catch(error) {
        throw new Error('Failed to get sales')
    }
}
