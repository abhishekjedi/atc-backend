import FlightController from './flight.controller';
import express from 'express';

const FlightRouter = express.Router({ mergeParams: true });
FlightRouter.post('/landing-requests', FlightController.submitLandingRequest);
FlightRouter.get('/:flightId/queue-position', FlightController.getFlgightPosition);
export default FlightRouter;
