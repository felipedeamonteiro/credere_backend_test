import CarCoordinates from '../models/CarCoordinates';
import ICarCoordinatesRepository from '../repositories/ICarCoordinatesRepository';

interface IRequest {
  pilot_name: string;
  movements: string[];
}

class CreateAndCalculateCoordinateService {
  constructor(private carCoordinatesRepository: ICarCoordinatesRepository) {}

  public async execute({
    pilot_name,
    movements,
  }: IRequest): Promise<CarCoordinates> {
    const carCoordinate = await this.carCoordinatesRepository.createAndCalculateCarCoordinates(
      {
        pilot_name,
        movements,
      },
    );

    return carCoordinate;
  }
}

export default CreateAndCalculateCoordinateService;
