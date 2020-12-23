import Movement from '../models/Movement';
import IMovementsRepository from '../repositories/IMovementsRepository';

interface IRequest {
  pilot_name: string;
  movement: string[];
}

class CreateMovementService {
  constructor(private movementsRepository: IMovementsRepository) {}

  public async execute({ pilot_name, movement }: IRequest): Promise<Movement> {
    const carMovement = this.movementsRepository.createMovement({
      pilot_name,
      movement: String(movement),
    });

    return carMovement;
  }
}

export default CreateMovementService;
