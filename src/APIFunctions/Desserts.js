import axios from 'axios';
import { ApiResponse } from './ApiResponses';

let DESSERT_API_URL = 'http://localhost:8084/dessert_api';

export async function getAllDesserts() {
    let status = new ApiResponse();
    try {
        const response = await axios.get(DESSERT_API_URL + `/Dessert/getDesserts`);
        status.responseData = response.data;
    }
    catch (error) {
        status.responseData = error;
        status.error = true;
    }

    return status;
}

export async function createDessert(data, token) {
    let status = new ApiResponse();
    try {
        const response = await axios.post(DESSERT_API_URL + `/Dessert/createDessert`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        status.responseData = response.data;
    }
    catch (error) {
        status.error = true;
        status.responseData = error;
    }
    return status;
}

export async function deleteDessert(data, token) {
    let status = new ApiResponse();
    try {
        const response = await axios.post(DESSERT_API_URL + `/Dessert/deleteDessert`, data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: data,
            }
        );
        status.responseData = response.data;
    }
    catch (err) {
        status.error = true;
        status.responseData = err;
    }
}

export async function editDessert(data, token) {
    let status = new ApiResponse();
    try {
        const response = await axios.post(DESSERT_API_URL + `/Dessert/editDessert`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: data,
        });
        status.responseData = response.data;
    }
    catch (error) {
        status.error = true;
        status.responseData = error;
    }
}