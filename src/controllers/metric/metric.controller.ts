import { Request, Response } from "express";
import MetricService from "../../services/metricService";

const MetricController = {
    getFlightMetrics: async (req: Request, res: Response) => {
        try {
            const airportCode = req.params.airportCode;
            if (!airportCode) {
                return res.status(400).json({ message: "Airport code is required" });
            }
            const metrics = await MetricService.getMetrics(airportCode);
            return res.status(200).json(metrics);
        } catch (err) {
            console.error("Error fetching flight metrics:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default MetricController;