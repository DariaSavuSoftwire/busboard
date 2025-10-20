import {useState} from "react";
import {getArrivals} from './backend/fetchArrivals.ts'
import type {ArrivalData} from "./interfaces/ArrivalData.ts";

function App() {
    const [arrivalsData, setArrivalsData] = useState<ArrivalData[]>();
    const [stopCode, setStopCode] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>();

    async function getArrivalsData() {
        if (!stopCode) {
            setErrorMessage("Please specify a stop code");
            return;
        }
        try {
            const arrivalsData = await getArrivals(stopCode);
            setArrivalsData(arrivalsData);
            setErrorMessage("");
        } catch {
            setErrorMessage("Timetable could not be retrieved");
        }

    }

    return (
        <div className="m-4">
            <h1 className="text-cyan-600 text-3xl font-bold underline text-center m-4">
                BusBoard
            </h1>
            <div className=" gap-y-6 flex flex-col items-center p-6">
                <div className="p-4">
                    <input
                        className="p-2 border-2 m-2"
                        placeholder={"Enter a stopcode..."}
                        onChange={(event) => setStopCode(event.target.value)}>
                    </input>
                    <button
                        className="p-2 border-2 border-blue-700 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        onClick={getArrivalsData}>Get Arrivals
                    </button>
                </div>
                <>
                    {errorMessage
                        ? <div>{errorMessage}</div>
                        : <div className=" w-full max-w-3xl t-6">
                            <table className="min-w-full border border-gray-200">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left px-4 py-2 border-b">Route</th>
                                    <th className="text-left px-4 py-2 border-b">Destination</th>
                                    <th className="text-left px-4 py-2 border-b">Arriving In (min)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {arrivalsData?.map((arrival, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border-b">{arrival.route}</td>
                                        <td className="px-4 py-2 border-b">{arrival.destination}</td>
                                        <td className="px-4 py-2 border-b">{arrival.arrivalTime}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    }
                </>
            </div>
        </div>
    )
}

export default App
