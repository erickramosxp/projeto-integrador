import axios from "axios";
const BASE_URL = "http://localhost:3005/api";

export const supplierService = {
    create: async (fornecedorData: any) => {
        const response = await axios.post(`${BASE_URL}/fornecedor`, fornecedorData);
        return response.data;
    },
    getAll: async () => {
        const response = await axios.get(`${BASE_URL}/fornecedor`);
        return response.data;
    }
}