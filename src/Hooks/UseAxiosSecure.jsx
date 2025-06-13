import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthContext';

const axiosInstance = axios.create({
    baseURL: 'https://track-n-fresh-server.vercel.app',
});

const UseAxiosSecure = () => {

    const { user, logout } = useContext(AuthContext);

    axiosInstance.interceptors.request.use(
        (config) => {
            if (user && user.accessToken) {
                config.headers.authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401 || error.response.status === 403) {
                logout();
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default UseAxiosSecure;