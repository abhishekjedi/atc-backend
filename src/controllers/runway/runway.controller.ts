import { Request, Response } from "express";
import RunWayService  from "../../services/runwayService";
import { RunwayStatus } from "../../utils/constants/types";

const RunwayController = {
    addRunWay : async (req: Request, res: Response) => {
        const {id,capacityPerHour, coolOfSeconds} = req.body;
        const airportCode = req.params.airportCode;
        try{
            await RunWayService.addRunWay({
                id,
                capacityPerHour,
                coolOfSeconds,
                airportCode
            });
            return res.status(200).json({
                message: "Runway added successfully"
            });
        }catch(err){
            console.error("Error adding runway:", err);
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    },

    removeRunWay: async (req: Request, res: Response) => {
        try{
            RunWayService.removeRunWay(req.params.id, req.params.airportCode);
            return res.status(200).json({
                message: "Runway removed successfully"
            });
        }catch(err){
            console.error("Error removing runway:", err);
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    },

    changeRunwayStatus: async (req: Request, res: Response) => {
        const {status} = req.body;
        const id = req.params.id;
        const airportCode = req.params.airportCode;
        try{
            if(Object.values(RunwayStatus).indexOf(status) === -1) {
                return res.status(400).json({
                    message: "Invalid runway status"
                });
            }
            await RunWayService.changeRunwayStatus(id, airportCode, status);
            return res.status(200).json({
                message: "Runway status changed successfully"
            });
        }catch(err){
            console.error("Error changing runway status:", err);
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }
}

export default RunwayController;