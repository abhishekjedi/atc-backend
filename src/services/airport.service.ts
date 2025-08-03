import { Airport } from "../utils/constants/types";
import AirportDP from "../db/dataproviders/airport.dataprovider";

const AirportService = {
    addAirport: async (airport: Airport) => {
        console.log(`Adding airport: ${airport.name} with code: ${airport.airportCode}`);
        await AirportDP.addAirport(airport);
        return { message: `Airport ${airport.name} added successfully` };
    },

    getAirportDetails: async (airportCode: string) => {
        console.log(`Fetching details for airport code: ${airportCode}`);
        const airportDetails = await AirportDP.getAirportDetails(airportCode);
        if (!airportDetails) {
            throw new Error(`Airport with code ${airportCode} not found`);
        }
        return airportDetails;
    },

    listAirports: async () => {
        console.log("Listing all airports");
        const airports = await AirportDP.listAirports();
        return airports;
    }
};

export default AirportService;