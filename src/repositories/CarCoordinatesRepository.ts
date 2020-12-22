import { EntityRepository, getRepository, Repository } from 'typeorm';
import CarCoordinates from '../models/CarCoordinates';

interface ICarCoordinatesRepository {
  resetCoordinates(): Promise<CarCoordinates>;
}

@EntityRepository(CarCoordinates)
class CarCoordinatesRepository implements ICarCoordinatesRepository {
  private ormRepository: Repository<CarCoordinates>;

  constructor() {
    this.ormRepository = getRepository(CarCoordinates);
  }

  public async resetCoordinates(): Promise<CarCoordinates> {
    const carPosition = await this.ormRepository.save({
      xCoordinate: 0,
      yCoordinate: 0,
      carDirection: 'right',
    });

    return carPosition;
  }
}

export default CarCoordinatesRepository;
