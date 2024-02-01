import { api } from "./api";

type Skema = {
    Nm_skema? : string;
    Jenis?: string;
    Jml_unit?: string;
}


export async function getSkema(id?:String) {
    try {
        const res = await api.get(`/skema${id?`/${id}`:'s'}`);
        return res.data;
    } catch (error: any) {
        throw Error = error
    }
}

export async function createSkema(props:Skema) {
    try {
        const res = await api.post(`/skema`,{
            ...props
        });
        return res.data;
    } catch (error: any) {
        throw Error = error
    }
}

export async function updateSkema(id:string,props:Skema) {
    try {
        const res = await api.put(`/skema${id?`/${id}`:''}`,{
            ...props
        });
        return res.data;
    } catch (error: any) {
        throw Error = error
    }
}

export async function deleteSkema(id:string) {
    try {
        const res = await api.delete(`/skema/${id}`);
        return res.data;
    } catch (error: any) {
        throw Error = error
    }
}