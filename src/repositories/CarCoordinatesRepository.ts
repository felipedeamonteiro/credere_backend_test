import { EntityRepository, Repository } from 'typeorm';
import CarCoordinates from '../models/CarCoordinates';

@EntityRepository(CarCoordinates)
class CarCoordinatesRepository extends Repository<CarCoordinates> {}

export default CarCoordinatesRepository;
