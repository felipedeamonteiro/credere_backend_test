import { EntityRepository, Repository } from 'typeorm';
import CarCoordinates from '../models/CarCoordinates';

@EntityRepository(CarCoordinates)
class CarCoordinatesRepository extends Repository<CarCoordinates> {
  public async resetCoordinates(pilot_name: string): Promise<CarCoordinates> {
    const pilotExists = this.findOne({
      where: {
        pilot_name,
      },
    });
    if (pilotExists) {
      const resetedCarPosition = await this.save({
        pilot_name,
        xCoordinate: 0,
        yCoordinate: 0,
        carDirection: 'right',
      });
      return resetedCarPosition;
    }
    throw new Error('There is no pilot activity yet.');
  }
}

export default CarCoordinatesRepository;
