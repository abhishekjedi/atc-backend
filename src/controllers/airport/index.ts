import express from 'express';
import AirportController from './airport.controller';
import authorizeRoles from '../../middlewares/authoriseRoles';
import CONSTANTS from '../../utils/constants/constants';

const airportRouter = express.Router({ mergeParams: true });
airportRouter.post('/',  AirportController.addAirport);
airportRouter.get('/:airportCode', AirportController.getAirportDetails);
airportRouter.get('/',  AirportController.listAllAirports);
export default airportRouter; 