import { prisma } from "../..";
import { RunWayRequest, RunwayStatus } from "../../utils/constants/types";

const RunwayDP = {
    addRunWay: async (req: RunWayRequest) => {
       return prisma.runway.create({
            data: {
                id: req.id,
                airportCode : req.airportCode,
                capacityPerHour: req.capacityPerHour,
                coolOffSeconds : req.coolOffSeconds,
                lastResetAt: new Date(),
                currentCount: 0,
            },
        });

    },

    removeRunWay:  async (id: string, airportId: string) => {
       return prisma.runway.delete({
            where: { 
                id: id,
                airportCode: airportId
             },
        });
    },

    changeRunwayStatus: async (id: string, airportId: string, status: RunwayStatus) => {
        return prisma.runway.update({
            where: { 
                id: id,
                airportCode: airportId
             },
            data: {
                status: status,
            },
        });
    },

    getAllRunways: async (airportCode: string) => {
        return prisma.runway.findMany({
            where: { airportCode: airportCode },
        });
    }
}

export default RunwayDP;