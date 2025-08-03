import { prisma } from "../..";
import { Airport } from "../../utils/constants/types";

const AirportDP = {
    addAirport: async (airport: any) => {
        return prisma.airport.create({
            data: airport
        });
    },
    getAirportDetails: async (airportCode: string) => {
        return prisma.airport.findUnique({
            where: { code: airportCode },
            include: { runways: true },
        });
    },
    listAirports: async () => {
        return prisma.airport.findMany({
                select: { code: true, name: true },
            });
    }
};

export default AirportDP;