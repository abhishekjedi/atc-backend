import { prisma } from "../..";
import { Flight, flightRequest } from "../../utils/constants/types";
import { Prisma } from '@prisma/client';


const FlightDataprovider = {

    createEmergencyFlightLandingRequest: ({
        airportCode,
        flightId,
        requestedAt,
    }: flightRequest) => {
        return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            const maxEmergency = await tx.flight.aggregate({
                where: {
                    airportCode,
                    assignedRunwayId: null,
                    status: 'emergency',
                },
                _max: { queuePosition: true },
            });

            const newQueuePos = (maxEmergency._max.queuePosition ?? 0) + 1;
            await tx.flight.updateMany({
                where: {
                    airportCode,
                    assignedRunwayId: null,
                    status: 'normal',
                    queuePosition: {
                        gte: newQueuePos,
                    },
                },
                data: {
                    queuePosition: {
                        increment: 1,
                    },
                },
            });
            return tx.flight.create({
                data: {
                    flightId,
                    airportCode,
                    status: 'emergency',
                    requestedAt,
                    queuePosition: newQueuePos,
                    priority: 2,
                },
            });
        });
    },


    createNormalFlightLandingRequest: async ({
        airportCode,
        flightId,
        requestedAt,
    }: {
        airportCode: string;
        flightId: string;
        requestedAt: Date;
    }) => {
        const max = await prisma.flight.aggregate({
            where: {
                airportCode,
                assignedRunwayId: null,
            },
            _max: { queuePosition: true },
        });

        const queuePosition = (max._max.queuePosition ?? 0) + 1;

        return prisma.flight.create({
            data: {
                flightId,
                airportCode,
                status: 'normal',
                requestedAt,
                queuePosition,
                priority: 1,
            },
        });
    },

    getFlight: async (flightId: string) => {
        return prisma.flight.findUnique({
            where: { flightId },
        });
    },

    getFlightPosition: (flight: Flight) => {
        const airportCode = flight.airportCode;
        const condition =
            flight.status === 'emergency'
                ? {
                    airportCode,
                    assignedRunwayId: null,
                    status: 'emergency',
                    queuePosition: { lt: flight.queuePosition },
                }
                : {
                    airportCode,
                    assignedRunwayId: null,
                    OR: [
                        { status: 'emergency' },
                        {
                            status: 'normal',
                            queuePosition: { lt: flight.queuePosition },
                        },
                    ],
                };

        return prisma.flight.count({ where: condition });
    },

    countQueuedFlights: async (airportCode: string) => {
        return prisma.flight.count({
            where: {
                airportCode,
                landedAt: null
            }
        });
    },

    countLandedFlightsInLastHour: async (airportCode: string) => {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        return prisma.flight.count({
            where: {
                airportCode,
                landedAt: {
                    gte: oneHourAgo
                }
            }
        });
    },
    markAsLanded: async (flightId: string, airportCode: string, landedAt: Date) => {
        return prisma.flight.updateMany({
            where: {
                flightId,
                airportCode,
                landedAt: null,
            },
            data: {
                landedAt,
            },
        });
    }
};

export default FlightDataprovider