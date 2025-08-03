import { RunWayRequest, RunwayStatus } from "../utils/constants/types";
import RunwayDP from "../db/dataproviders/runway.dataprovider";



const RunWayService = {
    async addRunWay(req: RunWayRequest) {
       return RunwayDP.addRunWay(req);  
    },

    async removeRunWay(id: string, airportCode: string) {
        return RunwayDP.removeRunWay(id, airportCode);
    },
    async changeRunwayStatus(id: string, airportCode: string, status: RunwayStatus) {
        return RunwayDP.changeRunwayStatus(id, airportCode, status);
    }   
};

export default RunWayService;