import { v4 as uuid } from 'uuid';

class CarDirection {
  id: string;

  xCoordinate: number;

  yCoordinate: number;

  carDirection: string;

  constructor({
    xCoordinate,
    yCoordinate,
    carDirection,
  }: Omit<CarDirection, 'id'>) {
    this.id = uuid();
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
    this.carDirection = carDirection;
  }
}

export default CarDirection;
