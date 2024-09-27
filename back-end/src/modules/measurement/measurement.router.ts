import { Router } from 'express';
import MeasurementController from './measurement.controller';
import { bodyValiteMiddleware } from '@src/shared/middlewares';
import { CreateMeasurementDto } from './dto/create-measurement.dto';

export const measurementRouter = Router();

measurementRouter.post(
  '/',
  bodyValiteMiddleware(CreateMeasurementDto),
  MeasurementController.create
);

measurementRouter.post('/extractor/', MeasurementController.extractCsv);

measurementRouter.get('/', MeasurementController.findMany);
