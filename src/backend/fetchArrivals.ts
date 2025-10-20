import axios from 'axios';

const BASE_URL = "https://api.tfl.gov.uk/";
const ARRIVALS_URL = "StopPoint/{id}/Arrivals";
const API_KEY = `?app_key=${import.meta.env.VITE_BUS_API_KEY}`;

export async function getArrivals(stopID: string) {
    try {
        const response = await axios.get(BASE_URL + ARRIVALS_URL + API_KEY, {
            params: {id: stopID}
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}