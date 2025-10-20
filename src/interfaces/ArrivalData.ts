export interface ArrivalData {
    route: string;
    destination: string;
    arrivalTime: number;
}

export interface ArrivalRawInfo {
    lineName: string;
    destinationName: string;
    expectedArrival: string;
}