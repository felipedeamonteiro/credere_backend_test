import { Router } from 'express';

import MovementsReposritory from '../repositories/MovementsRepository';
import CreateMovementService from '../services/CreateMovementService';

const movementsRouter = Router();
const movementsRepository = new MovementsReposritory();

movementsRouter.get('/', (request, response) => {
  const movements = movementsRepository.getAll();

  return response.json(movements);
});

movementsRouter.post('/', (request, response) => {
  try {
    const { movement } = request.body;

    const createMovement = new CreateMovementService(movementsRepository);

    const carMovement = createMovement.execute({ movement });

    return response.json(carMovement);
  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
});

export default movementsRouter;
