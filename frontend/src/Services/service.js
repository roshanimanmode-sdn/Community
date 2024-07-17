import axios from "axios";
import { loadingAction } from "../Slice/loaderSlice";

const apiUrl = 'http://localhost:8989/user'

export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/register`, { name, email, password });
    if (response.data.status) {
      return response;
    } else {
      return response;
    }
  } catch (e) {
    return null;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, { email, password });
    if (response.data.status) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response;
    } else {
      return response;
    }
  } catch (e) {
    return null;
  }
};

export const getAllUsersList = async () => {
  try {
    const response = await axios.get(`${apiUrl}/allUser`);
    if (response?.data?.status === true) {
      return response?.data?.data;

    } else {
      return response;
    }
  } catch (e) {
    return null;
  }
};
