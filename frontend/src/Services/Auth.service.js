import axios from "axios";
import { getInfo } from "./Auth.header";

const TOKEN = getInfo();
const apiUrl = 'http://localhost:8989/user';

let axiosConfig = {
    header: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
    },
};

// Function to handle registration
export const registerAPI = async (data) => {
    try {
        if (!data) {
            throw new Error('No data provided');
        }

        const response = await axios.post(`${apiUrl}/register`, data);

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

// Function to handle login
export const loginAPI = async (data) => {
    try {
        if (!data) {
            throw new Error('No data provided');
        }

        const response = await axios.post(`${apiUrl}/login`, data);
        if (response.status) {
            localStorage.setItem("users", JSON.stringify(response.data));
            localStorage.setItem("token", response.data.token);
            return response.data;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

// Function to update the profile visibility status
export const updateVisiblityStatus = async (data) => {
    try {
        if (!data) {
            throw new Error('No data provided');
        }
        const response = await axios.put(`${apiUrl}/profile-visible`, data);

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

// Function to fetch login user details
export const fetchUserDetails = async () => {
    try {
        console.log("axiosConfig--",axiosConfig);
        const response = await axios.get(apiUrl + "/get-details", axiosConfig);
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