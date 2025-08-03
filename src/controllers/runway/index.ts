import express from 'express';
import RunwayController from './runway.controller';
import authorizeRoles from '../../middlewares/authoriseRoles';

const RunwayRouter = express.Router({ mergeParams: true });

RunwayRouter.post('/', authorizeRoles(CONSTANTS.USER_ROLES.CONTROLLER), RunwayController.addRunWay)
RunwayRouter.delete('/:id', authorizeRoles(CONSTANTS.USER_ROLES.CONTROLLER),RunwayController.removeRunWay);
RunwayRouter.patch('/:id', authorizeRoles(CONSTANTS.USER_ROLES.ADMIN),RunwayController.changeRunwayStatus);

export default RunwayRouter;