import { getCustomRepository } from 'typeorm';
import Movement from '../models/Movement';
import MovementsRepository from '../repositories/MovementsRepository';

interface IRequest {
  movement: string[];
}

class CreateMovementService {
  public async execute({ movement }: IRequest): Promise<Movement> {
    const movementsRepository = getCustomRepository(MovementsRepository);

    const carMovement = movementsRepository.create({
      movement: String(movement),
    });

    await movementsRepository.save(carMovement);

    return carMovement;
  }
}

export default CreateMovementService;
