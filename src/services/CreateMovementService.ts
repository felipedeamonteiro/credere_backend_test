import { getCustomRepository } from 'typeorm';
import Movement from '../models/Movement';
import MovementsRepository from '../repositories/MovementsRepository';

interface IRequest {
  pilot_name: string;
  movement: string[];
}

class CreateMovementService {
  public async execute({ pilot_name, movement }: IRequest): Promise<Movement> {
    const movementsRepository = getCustomRepository(MovementsRepository);

    const carMovement = movementsRepository.create({
      pilot_name,
      movement: String(movement),
    });

    await movementsRepository.save(carMovement);

    return carMovement;
  }
}

export default CreateMovementService;
