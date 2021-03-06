/* eslint-disable no-plusplus */
import CarCoordinates from '../models/CarCoordinates';
import ICarCoordinatesRepository from '../repositories/ICarCoordinatesRepository';

interface IRequest {
  pilot_name: string;
}

class ResetCoordinatesService {
  constructor(private carCoordinatesRepository: ICarCoordinatesRepository) {}

  public async execute({ pilot_name }: IRequest): Promise<CarCoordinates> {
    const resetedCoordinates = await this.carCoordinatesRepository.resetCoordinates(
      pilot_name,
    );

    return resetedCoordinates;
  }
}

export default ResetCoordinatesService;
