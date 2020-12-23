/* eslint-disable no-plusplus */
import { getCustomRepository } from 'typeorm';
import CarCoordinates from '../models/CarCoordinates';

import CarCoordinatesRepository from '../repositories/CarCoordinatesRepository';

interface IRequest {
  pilot_name: string;
}

class ResetCoordinatesService {
  public async execute({ pilot_name }: IRequest): Promise<CarCoordinates> {
    const carCoordinatesRepository = getCustomRepository(
      CarCoordinatesRepository,
    );

    const pilotCoordinatesExists = await carCoordinatesRepository.findOne({
      where: { pilot_name },
    });

    if (pilotCoordinatesExists) {
      pilotCoordinatesExists.xCoordinate = 0;
      pilotCoordinatesExists.yCoordinate = 0;
      pilotCoordinatesExists.carDirection = 'right';

      const resetedCoordinates = await carCoordinatesRepository.save(
        pilotCoordinatesExists,
      );

      return resetedCoordinates;
    }
    throw new Error('There is no pilot activity yet.');
  }
}

export default ResetCoordinatesService;
