import { Router } from 'express';
import { uuid } from 'uuidv4';

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
