import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import CarCoordinatesRepository from '../repositories/CarCoordinatesRepository';
import MovementsRepository from '../repositories/MovementsRepository';
import CreateMovementService from '../services/CreateMovementService';
import CalculateCoordinateService from '../services/CalculateCoordinatesService';

const movementsRouter = Router();

movementsRouter.get('/', async (request, response) => {
  try {
    const movementsRepository = getCustomRepository(MovementsRepository);
    const movements = await movementsRepository.find();

    return response.json(movements);
  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
});

movementsRouter.post('/', async (request, response) => {
  try {
    const { movement } = request.body;

    const carCoordinatesRepository = getCustomRepository(
      CarCoordinatesRepository,
    );

    const createMovement = new CreateMovementService();
    const calculateCoordinates = new CalculateCoordinateService();

    createMovement.execute({ movement });
    const marsCarCoordinates = await calculateCoordinates.execute({
      movements: movement,
    });

    carCoordinatesRepository.create({
      xCoordinate: marsCarCoordinates.xCoordinate,
      yCoordinate: marsCarCoordinates.yCoordinate,
      carDirection: marsCarCoordinates.carDirection,
    });

    return response.json(marsCarCoordinates);
  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
});

export default movementsRouter;
