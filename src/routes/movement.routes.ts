import { Router } from 'express';

import CarCoordinatesRepository from '../repositories/CarCoordinatesRepository';
import MovementsRepository from '../repositories/MovementsRepository';
import CreateMovementService from '../services/CreateMovementService';
import CalculateCoordinateService from '../services/CalculateCoordinatesService';

const movementsRouter = Router();
const movementsRepository = new MovementsRepository();
const carCoordinatesRepository = new CarCoordinatesRepository();

movementsRouter.get('/:pilot_name', async (request, response) => {
  try {
    const { pilot_name } = request.params;
    const movements = await movementsRepository.findMovementsByName(pilot_name);

    return response.json(movements);
  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
});

movementsRouter.post('/', async (request, response) => {
  try {
    const { movement, name } = request.body;

    const createMovement = new CreateMovementService(movementsRepository);
    const calculateCoordinates = new CalculateCoordinateService();

    createMovement.execute({ pilot_name: name, movement });
    const marsCarCoordinates = await calculateCoordinates.execute({
      pilot_name: name,
      movements: movement,
    });

    carCoordinatesRepository.create({
      pilot_name: name,
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
