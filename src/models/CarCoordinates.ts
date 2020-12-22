class CarDirection {
  xCoordinate: number;

  yCoordinate: number;

  carDirection: string;

  constructor({ xCoordinate, yCoordinate, carDirection }: CarDirection) {
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
    this.carDirection = carDirection;
  }
}

export default CarDirection;
