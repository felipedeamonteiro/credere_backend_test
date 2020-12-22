import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CarCoordinatesRepository from '../repositories/CarCoordinatesRepository';
import MovementsRepository from '../repositories/MovementsRepository';
import CreateMovementService from '../services/CreateMovementService';
import CalculateCoordinateService from '../services/CalculateCoordinatesService';

const movementsRouter = Router();

movementsRouter.get('/', (request, response) => {
  const movementsRepository = getCustomRepository(MovementsRepository);
  const movements = movementsRepository.find();

  return response.json(movements);
});

movementsRouter.post('/', (request, response) => {
  try {
    const { movement } = request.body;
    const movementsRepository = getCustomRepository(MovementsRepository);
    const carCoordinatesRepository = getCustomRepository(
      CarCoordinatesRepository,
    );

    const createMovement = new CreateMovementService();

    const calculateCoordinates = new CalculateCoordinateService();

    createMovement.execute({ movement });
    const marsCarCoordinates = calculateCoordinates.execute({
      movements: movement,
    });
    carCoordinatesRepository.create(marsCarCoordinates);

    return response.json(marsCarCoordinates);
  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
});

export default movementsRouter;
