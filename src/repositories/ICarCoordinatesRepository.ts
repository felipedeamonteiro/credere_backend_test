import CarCoordinates from '../models/CarCoordinates';

interface ICarCoordinatesDTO {
  pilot_name: string;
  movements: string[];
}

// All the methods used by this repository as a "type for methods"
export default interface ICarCoordinatesRepository {
  getCarCoordinates(pilot_name: string): Promise<CarCoordinates | undefined>;
  resetCoordinates(pilot_name: string): Promise<CarCoordinates>;
  createAndCalculateCarCoordinates(
    carData: ICarCoordinatesDTO,
  ): Promise<CarCoordinates>;
}
