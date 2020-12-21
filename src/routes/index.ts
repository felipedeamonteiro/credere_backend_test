import { Router } from 'express';
import movementsRouter from './movement.routes';

const routes = Router();

routes.use('/movements', movementsRouter);

export default routes;
