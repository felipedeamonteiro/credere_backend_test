import { Router } from 'express';

import CarCoordinatesRepository from '../repositories/CarCoordinatesRepository';

const coordinatesRouter = Router();
const carCoordinatesRepository = new CarCoordinatesRepository();

coordinatesRouter.get('/', (request, response) => {
  const coordinates = carCoordinatesRepository.getCoordinates();

  return response.json(coordinates);
});

coordinatesRouter.post('/reset', (request, response) => {
  const coordinates = carCoordinatesRepository.resetCoordinates();

  return response.json(coordinates);
});

export default coordinatesRouter;
