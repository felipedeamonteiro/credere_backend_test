import { Router } from 'express';

import CarCoordinatesRepository from '../repositories/CarCoordinatesRepository';
import MovementsRepository from '../repositories/MovementsRepository';
// import CreateMovementService from '../services/CreateMovementService';
import CreateAndCalculateCoordinatesService from '../services/CreateAndCalculateCoordinatesService';
import GetMovementsService from '../services/GetMovementsService';

const movementsRouter = Router();

// endpoint to get all movements data from an specific pilot name
// It's not used in the application, but it helped when developing the api
movementsRouter.get('/:pilot_name', async (request, response) => {
  try {
    const movementsRepository = new MovementsRepository();

    const { pilot_name } = request.params;
    const getMovements = new GetMovementsService(movementsRepository);

    const movements = await getMovements.execute({ pilot_name });

    return response.json(movements);
  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
});

// endpoint to create and calculate coordinates and movements data from an specific pilot name.
// The storage of movements is not being used in the application, but it helped
// when developing the api.
movementsRouter.post('/', async (request, response) => {
  try {
    // const movementsRepository = new MovementsRepository();
    const carCoordinatesRepository = new CarCoordinatesRepository();

    const { movement, name } = request.body;

    // const createMovement = new CreateMovementService(movementsRepository);
    const calculateCoordinates = new CreateAndCalculateCoordinatesService(
      carCoordinatesRepository,
    );

    if (typeof movement === 'string') {
      // createMovement.execute({
      //   pilot_name: name,
      //   movement: movement.split(','),
      // });
      const marsCarCoordinates = await calculateCoordinates.execute({
        pilot_name: name,
        movements: movement.split(','),
      });
      return response.json(marsCarCoordinates);
    }
    // createMovement.execute({ pilot_name: name, movement });
    const marsCarCoordinates = await calculateCoordinates.execute({
      pilot_name: name,
      movements: movement,
    });

    return response.json(marsCarCoordinates);
  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
});

export default movementsRouter;
