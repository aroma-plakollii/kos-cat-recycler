import axios from "axios";
import { API_URL } from "../config";
import {getHeaders} from "../helpers/getHeaders";
import {Order} from "../types/order";
import {OrderForm} from "../types/orderForm";
import {UserTypeXREFSitemap} from "../types/userTypeXREPSitemap";
import {userTypeXREFSitemapForm} from "../types/userTypeXREFSitemapForm";

export const userTypeXREFSitemapGetAll = async (headers: any): Promise<UserTypeXREFSitemap[]> => {
    try {
        const res = await axios.get<UserTypeXREFSitemap[]>(`${API_URL}/userTypeXREFSitemaps`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting userTypeXREFSitemaps.');
    }
}

export const userTypeXREFSitemapGetSingle = async (idUserTypeXREFSitemap: number, headers: any): Promise<UserTypeXREFSitemap> => {
    try{
        const res = await axios(`${API_URL}/userTypeXREFSitemaps/${idUserTypeXREFSitemap}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get userTypeXREFSitemap')
    }
}

export const userTypeXREFSitemapCreate = async (userTypeXREFSitemapData: UserTypeXREFSitemap, headers: any): Promise<UserTypeXREFSitemap> => {
    try {
        const res = await axios.post(`${API_URL}/userTypeXREFSitemaps/create`, userTypeXREFSitemapData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to create userTypeXREFSitemap.');
    }
}

export const userTypeXREFSitemapUpdate = async (idUserTypeXREFSitemap: number, userTypeXREFSitemapData: UserTypeXREFSitemap, headers: any): Promise<UserTypeXREFSitemap> => {
    try {
        const res = await axios.put(`${API_URL}/userTypeXREFSitemaps/${idUserTypeXREFSitemap}`, userTypeXREFSitemapData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to update userTypeXREFSitemap.');
    }
}

export const userTypeXREFSitemapDelete = async (idUserTypeXREFSitemap: number | undefined, headers: any): Promise<UserTypeXREFSitemap> => {
    try{
        const res = await axios.delete(`${API_URL}/userTypeXREFSitemaps/${idUserTypeXREFSitemap}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to delete userTypeXREFSitemap')
    }
}

export const getCreateForm = async (headers: any): Promise<userTypeXREFSitemapForm> => {
    try {
        const res = await axios.get<userTypeXREFSitemapForm>(`${API_URL}/userTypeXREFSitemaps/create`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting userTypeXREFSitemap create form.');
    }
}

export const getUpdateForm = async (headers: any): Promise<userTypeXREFSitemapForm> => {
    try {
        const res = await axios.get<userTypeXREFSitemapForm>(`${API_URL}/userTypeXREFSitemaps/update`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting userTypeXREFSitemap update form.');
    }
}

export const getUserTypeXREFSitemapByUserType = async (idUserType: number, headers: any): Promise<UserTypeXREFSitemap[]> => {
    try{
        const res = await axios.get<UserTypeXREFSitemap[]>(`${API_URL}/userTypeXREFSitemaps/userTypes/${idUserType}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get userTypeXREFSitemaps')
    }
}

export const getUserTypeXREFSitemapBySitemap = async (idSitemap: number, headers: any): Promise<UserTypeXREFSitemap[]> => {
    try{
        const res = await axios(`${API_URL}/userTypeXREFSitemaps/sitemaps/${idSitemap}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get userTypeXREFSitemaps')
    }
}