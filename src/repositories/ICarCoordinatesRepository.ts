import CarCoordinates from '../models/CarCoordinates';

interface ICarCoordinatesDTO {
  pilot_name: string;
  movements: string[];
}

export default interface ICarCoordinatesRepository {
  getCarCoordinates(pilot_name: string): Promise<CarCoordinates | undefined>;
  resetCoordinates(pilot_name: string): Promise<CarCoordinates>;
  createAndCalculateCarCoordinates(
    carData: ICarCoordinatesDTO,
  ): Promise<CarCoordinates>;
}
