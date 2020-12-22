import { Router } from 'express';

import CarCoordinatesRepository from '../repositories/CarCoordinatesRepository';
import MovementsRepository from '../repositories/MovementsRepository';
import CreateMovementService from '../services/CreateMovementService';
import CalculateCoordinateService from '../services/CalculateCoordinatesService';

const movementsRouter = Router();
const movementsRepository = new MovementsRepository();
const carCoordinatesRepository = new CarCoordinatesRepository();

movementsRouter.get('/', (request, response) => {
  const movements = movementsRepository.getAll();

  return response.json(movements);
});

movementsRouter.post('/', (request, response) => {
  try {
    const { movement } = request.body;

    const createMovement = new CreateMovementService(movementsRepository);

    const calculateCoordinates = new CalculateCoordinateService(
      movementsRepository,
      carCoordinatesRepository,
    );

    createMovement.execute({ movement });
    const lunarCarCoordinates = calculateCoordinates.execute({
      movements: movement,
    });

    return response.json(lunarCarCoordinates);
  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
});

export default movementsRouter;
