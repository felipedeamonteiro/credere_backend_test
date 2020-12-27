import { Router } from 'express';
import CarCoordinatesRepository from '../repositories/CarCoordinatesRepository';

import ResetCoordinatesService from '../services/ResetCoordinatesService';
import GetCarCoordinateService from '../services/GetCarCoordinateService';

const coordinatesRouter = Router();

// Here it is created the base of the endpoints related to carCoordinates data.
// Using SOLID principles, routes just make connection to services and repositories

// endpoint to get coordinates data from an specific pilot name
coordinatesRouter.get('/:pilot_name', async (request, response) => {
  try {
    const carCoordinatesRepository = new CarCoordinatesRepository();

    const { pilot_name } = request.params;

    const getCoordinates = new GetCarCoordinateService(
      carCoordinatesRepository,
    );

    const coordinates = await getCoordinates.execute({ pilot_name });

    return response.json(coordinates);
  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
});

// endpoint to resets coordinates data from an specific pilot name
coordinatesRouter.post('/reset/:pilot_name', async (request, response) => {
  try {
    const carCoordinatesRepository = new CarCoordinatesRepository();

    const { pilot_name } = request.params;
    const resetCoordinates = new ResetCoordinatesService(
      carCoordinatesRepository,
    );

    const resetedCoordinates = resetCoordinates.execute({ pilot_name });

    return response.json(resetedCoordinates);
  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
});

export default coordinatesRouter;
