import { Router } from 'express';
import movementsRouter from './movement.routes';
import carCoordinatesRouter from './carCoordinate.routes';

const routes = Router();

// The base of the endpoints and its middlewares

routes.use('/movements', movementsRouter);
routes.use('/coordinates', carCoordinatesRouter);

export default routes;
