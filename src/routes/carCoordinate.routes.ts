import { Router } from 'express';

import CarCoordinatesRepository from '../repositories/CarCoordinatesRepository';

const coordinatesRouter = Router();
const carCoordinatesRepository = new CarCoordinatesRepository();

coordinatesRouter.get('/:pilot_name', async (request, response) => {
  try {
    const { pilot_name } = request.params;
    console.log('name', pilot_name);
    const coordinates = await carCoordinatesRepository.find({
      where: { pilot_name },
    });

    return response.json(coordinates);
  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
});

coordinatesRouter.post('/reset', async (request, response) => {
  try {
    const coordinates = await carCoordinatesRepository.resetCoordinates();

    return response.json(coordinates);
  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
});

export default coordinatesRouter;
