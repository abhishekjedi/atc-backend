import AssignmentDataprovider from "../db/dataproviders/assignment.dataprovider";

const AssignmentService = {
    assignNextFlightToRunway: async (airportCode: string, runwayId: string) => {
        return AssignmentDataprovider.assignNextFlightToRunwayTx(airportCode, runwayId);
    }
}

export default AssignmentService;