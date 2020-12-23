/* eslint-disable no-plusplus */
import CarCoordinates from '../models/CarCoordinates';
import ICarCoordinatesRepository from '../repositories/ICarCoordinatesRepository';

interface IRequest {
  pilot_name: string;
}

class GetCarCoordinateService {
  constructor(private carCoordinatesRepository: ICarCoordinatesRepository) {}

  public async execute({
    pilot_name,
  }: IRequest): Promise<CarCoordinates | undefined> {
    const carCoordinates = await this.carCoordinatesRepository.getCarCoordinates(
      pilot_name,
    );

    return carCoordinates;
  }
}

export default GetCarCoordinateService;
