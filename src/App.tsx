import {useState} from "react";
import {getArrivals} from './backend/fetchArrivals.ts'

function App() {
    const [arrivalsData, setArrivalsData] = useState<string[]>();

    async function getArrivalsData() {
        const arrivalsData = await getArrivals("490008660N");
        setArrivalsData(arrivalsData);
    }

    return (
        <>
            <h1 className="text-3xl font-bold underline text-center text-cyan-600 m-4"
            >BusBoard</h1>
            <button onClick={getArrivalsData}>Get Arrivals</button>
            <div>{arrivalsData && arrivalsData!.map((arrival, i) => (
                <pre key={i}>{JSON.stringify(arrival, null, 2)}</pre>))}</div>
        </>
    )
}

export default App
