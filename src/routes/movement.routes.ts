import { Router } from 'express';
import { v4 as uuid } from 'uuid';

// import Movement from '../models/Movement';

const movementsRouter = Router();

const movements = [];

movementsRouter.post('/', (request, response) => {
  const { movement } = request.body;

  const carMovement = {
    id: uuid(),
    movement,
  };

  movements.push(carMovement);

  return response.json(carMovement);
});

export default movementsRouter;
