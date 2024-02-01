import { api } from "./api";

type Peserta = {
    Kd_skema?: string;
    Nm_peserta? : string;
    Jenis?: string;
    Jml_unit?: string;
    Jekel: string,
    Alamat: string,
    No_hp: string
}


export async function getPeserta(id?:String, keyword?:String) {
    try {
        const res = await api.get(`/peserta${id?`/${id}`:''}${keyword?`?keyword=${keyword}`:''}`);
        return res.data;
    } catch (error: any) {
        throw Error = error
    }
}

export async function createPeserta(props:Peserta) {
    try {
        const res = await api.post(`/peserta`,{
            ...props
        });
        return res.data;
    } catch (error: any) {
        throw Error = error
    }
}

export async function updatePeserta(id:string, props:Peserta) {
    try {
        const res = await api.put(`/peserta${id?`/${id}`:''}`,{
            ...props
        });
        return res.data;
    } catch (error: any) {
        throw Error = error
    }
}

export async function deletePeserta(id:string) {
    try {
        const res = await api.delete(`/peserta/${id}`);
        return res.data;
    } catch (error: any) {
        throw Error = error
    }
}