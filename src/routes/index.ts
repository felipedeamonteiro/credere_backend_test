import { Router } from 'express';
import movementsRouter from './movement.routes';
import carCoordinatesRouter from './carCoordinate.routes';

const routes = Router();

routes.use('/movements', movementsRouter);
routes.use('/coordinates', carCoordinatesRouter);

export default routes;
