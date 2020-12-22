import { EntityRepository, Repository } from 'typeorm';
import CarCoordinates from '../models/CarCoordinates';

interface ICarCoordinatesRepository {
  resetCoordinates(): Promise<CarCoordinates>;
}

@EntityRepository(CarCoordinates)
class CarCoordinatesRepository
  extends Repository<CarCoordinates>
  implements ICarCoordinatesRepository {
  private ormRepository: Repository<CarCoordinates>;

  public async resetCoordinates(): Promise<CarCoordinates> {
    const resetedCarPosition = await this.ormRepository.save({
      xCoordinate: 0,
      yCoordinate: 0,
      carDirection: 'right',
    });

    return resetedCarPosition;
  }
}

export default CarCoordinatesRepository;
