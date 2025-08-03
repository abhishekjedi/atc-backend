import FlightDataprovider from "../db/dataproviders/flight.dataproviders";

const MetricService = {
        getMetrics: async (airportCode: string) => {
        const queueLength = await FlightDataprovider.countQueuedFlights(airportCode);
        const throughput = await FlightDataprovider.countLandedFlightsInLastHour(airportCode);

        return {
            queueLength,
            throughputLastHour: throughput,
            timestamp: new Date().toISOString()
        };
    }
};

export default MetricService;