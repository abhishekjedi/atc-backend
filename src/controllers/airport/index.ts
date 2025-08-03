import express from 'express';
import AirportController from './airport.controller';
import authorizeRoles from '../../middlewares/authoriseRoles';

const airportRouter = express.Router({ mergeParams: true });
airportRouter.post('/', authorizeRoles(CONSTANTS.USER_ROLES.ADMIN), AirportController.addAirport);
airportRouter.get('/:airportCode', authorizeRoles(CONSTANTS.USER_ROLES.CONTROLLER), AirportController.getAirportDetails);
airportRouter.get('/', authorizeRoles(CONSTANTS.USER_ROLES.CONTROLLER), AirportController.listAllAirports);
export default airportRouter; 