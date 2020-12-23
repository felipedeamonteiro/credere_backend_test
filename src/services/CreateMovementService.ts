import { getCustomRepository } from 'typeorm';
import Movement from '../models/Movement';
import MovementsRepository from '../repositories/MovementsRepository';
import FakeMovementRepository from '../repositories/fakes/FakeMovementsRepository';

interface IRequest {
  pilot_name: string;
  movement: string[];
}

class CreateMovementService {
  public async execute({ pilot_name, movement }: IRequest): Promise<Movement> {
    if (process.env.NODE_ENV === 'test') {
      const movementsFakeRepository = new FakeMovementRepository();

      const carMovement = movementsFakeRepository.create({
        pilot_name,
        movement: String(movement),
      });

      return carMovement;
    }
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
