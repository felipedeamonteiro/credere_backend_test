import CarCoordinates from '../models/CarCoordinates';

interface ICreateCarCoordinatesDTO {
  xCoordinate: number;
  yCoordinate: number;
  carDirection: string;
}

class CarCoordinatesRepository {
  private carCoordinates: CarCoordinates;

  constructor() {
    this.carCoordinates = {
      xCoordinate: 0,
      yCoordinate: 0,
      carDirection: 'right',
    };
  }

  public getCoordinates(): CarCoordinates {
    return this.carCoordinates;
  }

  public create({
    xCoordinate,
    yCoordinate,
    carDirection,
  }: ICreateCarCoordinatesDTO): CarCoordinates {
    const carPosition = new CarCoordinates({
      xCoordinate,
      yCoordinate,
      carDirection,
    });

    this.carCoordinates.xCoordinate = xCoordinate;
    this.carCoordinates.yCoordinate = yCoordinate;
    this.carCoordinates.carDirection = carDirection;

    return carPosition;
  }

  public resetCoordinates(): CarCoordinates {
    const carPosition = new CarCoordinates({
      xCoordinate: 0,
      yCoordinate: 0,
      carDirection: 'right',
    });

    this.carCoordinates = carPosition;

    return carPosition;
  }
}

export default CarCoordinatesRepository;
