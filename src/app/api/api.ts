import axios from "axios";

export const api = axios.create({
    baseURL: process.env.baseURL
    // baseURL: `https://${window.location.hostname}/api`
    // baseURL: typeof window !== 'undefined' ? `https://${window.location.hostname}/api` : process.env.baseURL
})