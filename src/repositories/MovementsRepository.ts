import Movement from '../models/Movement';

interface ICreateMovementDTO {
  movement: string[];
}

class MovementsRepository {
  private movements: Movement[];

  constructor() {
    this.movements = [];
  }

  public getAll(): Movement[] {
    return this.movements;
  }

  public create({ movement }: ICreateMovementDTO): Movement {
    const carMovement = new Movement({ movement });

    this.movements.push(carMovement);

    return carMovement;
  }
}

export default MovementsRepository;
