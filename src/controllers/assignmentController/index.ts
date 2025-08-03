import express from "express";
import AssignmentController from "./assignment.controller";
import authorizeRoles from "../../middlewares/authoriseRoles";

const AssignmentRouter = express.Router({ mergeParams: true });

AssignmentRouter.post('/', authorizeRoles(CONSTANTS.USER_ROLES.SERVICE),AssignmentController.assignNextFlightToRunway);
AssignmentRouter.get('/', authorizeRoles(CONSTANTS.USER_ROLES.CONTROLLER), AssignmentController.listAllActiveAssignments);

export default AssignmentRouter;