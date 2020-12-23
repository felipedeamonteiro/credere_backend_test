import { Router } from 'express';

import ResetCoordinatesService from '../services/ResetCoordinatesService';
import GetCarCoordinateService from '../services/GetCarCoordinateService';
import CreateAndCalculateCoordinateService from '../services/CreateAndCalculateCoordinateService';

const coordinatesRouter = Router();

coordinatesRouter.get('/:pilot_name', async (request, response) => {
  try {
    const { pilot_name } = request.params;

    const coordinates = await carCoordinatesRepository.find({
      where: { pilot_name },
    });

    return response.json(coordinates);
  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
});

coordinatesRouter.post('/reset/:pilot_name', async (request, response) => {
  try {
    const { pilot_name } = request.params;
    const resetCoordinates = new ResetCoordinatesService();

    const resetedCoordinates = resetCoordinates.execute({ pilot_name });

    return response.json(resetedCoordinates);
  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
});

export default coordinatesRouter;
