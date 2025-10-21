import axios from 'axios';
import type {ArrivalData} from "../interfaces/ArrivalData.ts";

const BASE_URL = "https://api.tfl.gov.uk/";
const ARRIVALS_URL = "StopPoint/{id}/Arrivals";
const API_KEY = `?app_key=${import.meta.env.VITE_BUS_API_KEY}`;

function parseArrivalInfo(response: ArrivalData[]): ArrivalData[] {
    const mappedArrivalInfo: ArrivalData[] = response.map((arrivalInfo: ArrivalData): ArrivalData =>
        ({
            lineName: arrivalInfo.lineName,
            destinationName: arrivalInfo.destinationName,
            expectedArrival: Math.floor((new Date(arrivalInfo.expectedArrival).getTime() - new Date().getTime()) / 1000 / 60),
        }));
    return mappedArrivalInfo
        .sort((arrivalDataFirst, arrivalDataSecond) =>
            arrivalDataFirst.expectedArrival as number - (arrivalDataSecond.expectedArrival as number))
        .slice(0, 5);
}

export async function getArrivals(stopID: string) {
    try {
        const response = await axios.get(BASE_URL + ARRIVALS_URL + API_KEY, {
            params: {id: stopID}
        });
        console.log(response.data);
        return parseArrivalInfo(response.data) ?? [];
    } catch (error) {
        console.log(error);
        throw error;
    }
}