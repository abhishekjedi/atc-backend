import express from 'express';
import MetricController from './metric.controller';
import authorizeRoles from '../../middlewares/authoriseRoles';
import CONSTANTS from '../../utils/constants/constants';

const MetricRouter = express.Router({ mergeParams: true });

MetricRouter.get('/', MetricController.getFlightMetrics);

export default MetricRouter;