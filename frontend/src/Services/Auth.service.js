import axios from "axios";

const apiUrl = 'http://localhost:8989/user'

export const registerAPI = async (data) => {
    try {
        if (data) {
            const response = await axios.post(apiUrl, data);
            return response.data;
        } else {
            console.error('Error: No data provided');
        }
    } catch (e) {
        console.error('Error:', e);
        throw e;
    }
};

export const loginAPI = async (data) => {
    try {
        if (data) {
            const response = await axios.post(apiUrl, data);
            return response.data;
        } else {
            console.error('Error: No data provided');
        }
    } catch (e) {
        console.error('Error:', e);
        throw e;
    }
};