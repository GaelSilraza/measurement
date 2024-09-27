import { Router } from 'express';

import { measurementRouter } from './modules/measurement/measurement.router';
import { paginationMiddleware, receiveFileMiddleware } from './shared/middlewares';

export const router = Router();

router.use(receiveFileMiddleware);
router.use(paginationMiddleware);

router.use('/measurement/', measurementRouter);
