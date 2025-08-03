import { Request, Response } from "express";
import FlightService from "../../services/flightService";

const FlightController = {
    submitLandingRequest: async (req: Request, res: Response) => {
       try{
         const {flightId, status, requestedAt} = req.body;
         const airportCode = req.params.airportCode;
        await FlightService.submitLandingRequest({
            flightId,
            status,
            requestedAt,
            airportCode
        });
        return res.status(200).json({
            message: "Landing request submitted successfully"
        })

       }catch(err){
        return res.status(500).json({
            message: "Internal server error",
        });
       }
    },

    getFlgightPosition: async (req: Request, res: Response) => { 
      try{
        const {flightId,airportCode} = req.params;
        const positionAndWaitTime = await FlightService.getFlightPositionAndWaitTime(flightId, airportCode);
        if(positionAndWaitTime.position !== null) { 
            return res.status(200).json({
                position: positionAndWaitTime.position,
                waitTime: positionAndWaitTime.waitTime
            });
        } else {
            return res.status(404).json({
                message: "Flight not found"
            });
        }
      }catch(err){
        return res.status(500).json({
            message: "Internal server error",
        });
      }
    },
}

export default FlightController;