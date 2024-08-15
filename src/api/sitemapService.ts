import axios from "axios";
import { API_URL } from "../config";
import {getHeaders} from "../helpers/getHeaders";
import {Sitemap} from "../types/sitemap";

export const sitemapGetAll = async (headers: any): Promise<Sitemap[]> => {
    try {
        const res = await axios.get(`${API_URL}/sitemaps`,{headers});

        return res.data;
    } catch (error) {
        throw new Error('Failed getting sitemaps.');
    }
}

export const sitemapGetSingle = async (idSitemap: number, headers: any): Promise<Sitemap> => {
    try{
        const res = await axios(`${API_URL}/sitemaps/${idSitemap}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to get sitemap')
    }
}

export const sitemapCreate = async (sitemapData: Sitemap, headers: any): Promise<Sitemap> => {
    try {
        const res = await axios.post(`${API_URL}/sitemaps/create`, sitemapData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to create sitemap.');
    }
}

export const sitemapUpdate = async (idSitemap: number, sitemapData: Sitemap, headers: any): Promise<Sitemap> => {
    try {
        const res = await axios.put(`${API_URL}/sitemaps/${idSitemap}`, sitemapData, { headers });
        return res.data;
    } catch (error) {
        throw new Error('Failed to update sitemap.');
    }
}

export const sitemapDelete = async (idSitemap: number | undefined, headers: any): Promise<Sitemap> => {
    try{
        const res = await axios.delete(`${API_URL}/sitemaps/${idSitemap}`, {headers})
        return res.data
    }catch(error) {
        throw new Error('Failed to delete sitemap')
    }
}