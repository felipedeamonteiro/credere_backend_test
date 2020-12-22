import Movement from '../models/Movement';
import MovementsRepository from '../repositories/MovementsRepository';

interface IRequest {
  movement: string[];
}

class CreateMovementService {
  private movementsRepository: MovementsRepository;

  constructor(
    movementsRepository: MovementsRepository,
    carCoordinatesRepository: CarCoordinatesRepository,
  ) {
    this.movementsRepository = movementsRepository;
    this.carCoordinatesRepository = carCoordinatesRepository;
  }

  public execute({ movement }: IRequest): Movement {
    const carMovement = this.movementsRepository.create({ movement });

    return carMovement;
  }
}

export default CreateMovementService;
