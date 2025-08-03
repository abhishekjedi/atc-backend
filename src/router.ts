import express from 'express';
import FlightRouter from './controllers/flight';
import AirportRouter from './controllers/airport';
import RunwayRouter from './controllers/runway';
import AssignmentRouter from './controllers/assignmentController';
import MetricRouter from './controllers/metric';

const router = express.Router();


router.use('/airports/:airportCode/flights', FlightRouter);
router.use('/airports/:airportCode/runways', RunwayRouter)
router.use('/airports/:airportCode/assignments', AssignmentRouter);
router.use('/airports/:airportCode/metrics', MetricRouter);
router.use('/airports', AirportRouter);

export default router;