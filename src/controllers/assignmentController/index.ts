import express from "express";
import AssignmentController from "./assignment.controller";
import authorizeRoles from "../../middlewares/authoriseRoles";
import CONSTANTS from "../../utils/constants/constants";

const AssignmentRouter = express.Router({ mergeParams: true });

AssignmentRouter.post('/', AssignmentController.assignNextFlightToRunway);
AssignmentRouter.get('/',  AssignmentController.listAllActiveAssignments);

export default AssignmentRouter;