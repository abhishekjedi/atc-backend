import express from 'express';
import RunwayController from './runway.controller';
import authorizeRoles from '../../middlewares/authoriseRoles';
import CONSTANTS from '../../utils/constants/constants';

const RunwayRouter = express.Router({ mergeParams: true });

RunwayRouter.post('/',  RunwayController.addRunWay)
RunwayRouter.delete('/:id', RunwayController.removeRunWay);
RunwayRouter.patch('/:id', RunwayController.changeRunwayStatus);
RunwayRouter.get('/', RunwayController.getAllRunways);
export default RunwayRouter;