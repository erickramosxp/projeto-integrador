import axios from "axios";
const BASE_URL = "http://localhost:3005/api";

export const productService = {
    create: async (productData: any) => {
        const response = await axios.post(`${BASE_URL}/produtos`, productData);
        return response.data;
    },
    getAll: async () => {
        const response = await axios.get(`${BASE_URL}/produtos`);
        return response.data;
    }
}