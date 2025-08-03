import { get } from "http";
import AssignmentDataprovider from "../db/dataproviders/assignment.dataprovider";

const AssignmentService = {
    assignNextFlightToRunway: async (airportCode: string, runwayId: string) => {
        return AssignmentDataprovider.assignNextFlightToRunwayTx(airportCode, runwayId);
    },

    getActiveAssignments: async (airportCode: string) => {
        return AssignmentDataprovider.getActiveAssignments(airportCode);
    }
    
}

export default AssignmentService;