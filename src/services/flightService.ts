import { flightRequest } from "../utils/constants/types";
import FlightDataprovider from "../db/dataproviders/flight.dataproviders";
import { publishMsgToQueue } from "../utils/rabbimq";



const FlightService = {
    submitLandingRequest: async (req: flightRequest) => {
        const existing = await FlightDataprovider.getFlight(req.flightId);

        if (existing) {
            throw new Error('Flight already exists');
        }

        if (req.status === 'emergency') {
            return FlightDataprovider.createEmergencyFlightLandingRequest(req);
        }

        return FlightDataprovider.createNormalFlightLandingRequest(req);
    },

    getFlightPositionAndWaitTime: async (flightId: string, airportCode: string) => {
        const flight = await FlightDataprovider.getFlight(flightId);
        if (!flight || flight.airportCode !== airportCode || flight.assignedRunwayId !== null) {
            return { position: null, waitTime: 0 };
        }
        const position = await FlightDataprovider.getFlightPosition(flight);
        return {
            position: position + 1,
            waitTime: (position + 1) * 40 // Assuming each position corresponds to 40 seconds wait time
        }
    },

    markFlightAsLanded: async (flightId: string, airportCode: string) => {
        const now = new Date();

        await FlightDataprovider.markAsLanded(flightId, airportCode, now);

        
        await publishMsgToQueue({
            flightId,
            airportCode,
            landedAt: now,
        },
        'flight.landed');

        return { flightId, landedAt: now };
    },
};

export default FlightService;