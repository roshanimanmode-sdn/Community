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

// Function to Archieve user
export const archieveUserAPI = async (userId, addedUserId) => {
    try {
        if (!userId && !addedUserId) {
            throw new Error('No data provided');
        }
        let payload = {
            userId: userId,
            added_userId: addedUserId
        }
        console.log("payload--",payload);
        
        const response = await axios.post(`${apiUrl}/user`, payload, axiosConfig);
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

// Function to get all Archieve user
export const getAllArchieveUserAPI = async (userId) => {
    try {
        if (!userId) {
            throw new Error('No data provided');
        }
        
        const response = await axios.post(`${apiUrl}/get-all-archieve`, userId, axiosConfig);
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

// Function to delete Archieve user
export const deleteArchieveUserAPI = async (userId) => {
    try {
        if (!userId) {
            throw new Error('No data provided');
        }
        
        const response = await axios.post(`${apiUrl}/delete-archieve`, userId, axiosConfig);
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
