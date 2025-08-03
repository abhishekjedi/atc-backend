import { Request, Response } from "express";
import { Airport } from "../../utils/constants/types";
import AirportService from "../../services/airport.service";
import MetricService from "../../services/metricService";

const AirportController = {
    addAirport: async (req: Request, res: Response) => {
      try{
        const { code, name, timezone, location = {} } = req.body;
        const { latitude, longitude } = location;
        console.log("Adding airport:", { code, name, timezone, latitude, longitude });
        if (!code || !name || !timezone || !latitude || !longitude) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const airport: Airport = {
            code,
            name,
            timezone,
            lat: latitude,
            lng: longitude,
        };
        await AirportService.addAirport(airport);
        return res.status(201).json({ message: `Airport ${name} added successfully` });
      }catch(err){
        console.error("Error adding airport:", err);
        res.status(500).json({ message: "Internal server error" });
      }
    },

    getAirportDetails: async (req: Request, res: Response) => {
        try {
            const airportCode = req.params.airportCode;
            if (!airportCode) {
                return res.status(400).json({ message: "Airport code is required" });
            }
            const airportDetails = await AirportService.getAirportDetails(airportCode);
            return res.status(200).json(airportDetails);
        } catch (err) {
            console.error("Error fetching airport details:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    listAllAirports: async (req: Request, res: Response) => {
        try {
            const airports = await AirportService.listAirports();
            return res.status(200).json(airports);
        } catch (err) {
            console.error("Error listing airports:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    },

};

export default AirportController;