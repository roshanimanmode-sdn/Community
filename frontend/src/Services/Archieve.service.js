import axios from "axios";
import { getInfo } from "./Auth.header";

const TOKEN = getInfo();
const apiUrl = 'http://localhost:8989/archieve';

let axiosConfig = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
    },
};

// Function to handle registration
export const archieveUserAPI = async (userId) => {
    try {
        if (!userId) {
            throw new Error('No data provided');
        }
        const response = await axios.post(`${apiUrl}/user`, userId, axiosConfig);
        if (response.status) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};
