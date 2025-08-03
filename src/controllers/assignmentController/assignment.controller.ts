import { Request, Response } from "express";
import AssignmentService from "../../services/assignment.service";

const AssignmentController = {
    assignNextFlightToRunway: async (req: Request, res: Response) => {
        try {
            const { airportCode } = req.params;
            const { runwayId } = req.body;
            if (!airportCode || !runwayId) {
                return res.status(400).json({ message: "Airport code and runway ID are required" });
            }
            await AssignmentService.assignNextFlightToRunway(airportCode, runwayId);
            return res.status(200).json({ message: `Flight assigned to runway ${runwayId} at airport ${airportCode} successfully` });
        } catch (err) {
            console.error("Error assigning flight to runway:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    listAllActiveAssignments: async (req: Request, res: Response) => {
        try {
            const { airportCode } = req.params;
            if (!airportCode) {
                return res.status(400).json({ message: "Airport code is required" });
            }
            const assignments = await AssignmentService.getActiveAssignments(airportCode);
            return res.status(200).json(assignments);
        } catch (err) {
            console.error("Error listing active assignments:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};

export default AssignmentController;