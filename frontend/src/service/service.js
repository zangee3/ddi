import axios from 'axios';

export const service = axios.create({
    baseURL: "http://localhost:9000",
});

service.interceptors.response.use(
    response => response,
    error => {
        // whatever you want to do with the error
        console.log(error.response)
        throw error;
    }
);

export default service;
