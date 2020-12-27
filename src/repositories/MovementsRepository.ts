import { getRepository, Repository } from 'typeorm';
import IMovementRepository from './IMovementsRepository';
import Movement from '../models/Movement';

interface IMovementDTO {
  pilot_name: string;
  movement: string;
}

/**
 * All the methods related to this repository
 * Here the class implements the methods described in IMovementRepository
 * and the constructor gets the CarCoordinates repository methods from typeorm.
 * It helps with the logics, connection with database and with SOLID principles
 */

class MovementsRepository implements IMovementRepository {
  private ormRepository: Repository<Movement>;

  constructor() {
    this.ormRepository = getRepository(Movement);
  }

  public async createMovement(moveData: IMovementDTO): Promise<Movement> {
    const move = this.ormRepository.create(moveData);

    await this.ormRepository.save(move);

    return move;
  }

  public async findMovementsByName(
    pilot_name: string,
  ): Promise<Movement[] | undefined> {
    const movement = await this.ormRepository.find({
      where: { pilot_name },
    });

    return movement;
  }
}

export default MovementsRepository;
