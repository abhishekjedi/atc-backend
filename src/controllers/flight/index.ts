import authorizeRoles from '../../middlewares/authoriseRoles';
import FlightController from './flight.controller';
import express from 'express';

const FlightRouter = express.Router({ mergeParams: true });
FlightRouter.post('landing-requests', authorizeRoles(CONSTANTS.USER_ROLES.FLIGHT), FlightController.submitLandingRequest);
FlightRouter.get('{flightId}/queue-position', authorizeRoles(CONSTANTS.USER_ROLES.FLIGHT), FlightController.getFlgightPosition);
export default FlightRouter;
