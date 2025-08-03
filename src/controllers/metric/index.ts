import express from 'express';
import MetricController from './metric.controller';
import authorizeRoles from '../../middlewares/authoriseRoles';

const MetricRouter = express.Router({ mergeParams: true });

MetricRouter.get('/metrics', authorizeRoles(CONSTANTS.USER_ROLES.CONTROLLER), MetricController.getFlightMetrics);

export default MetricRouter;