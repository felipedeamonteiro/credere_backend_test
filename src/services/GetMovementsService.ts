import Movement from '../models/Movement';
import IMovementsRepository from '../repositories/IMovementsRepository';

interface IRequest {
  pilot_name: string;
}

class GetMovementService {
  constructor(private movementsRepository: IMovementsRepository) {}

  public async execute({
    pilot_name,
  }: IRequest): Promise<Movement[] | undefined> {
    const movements = await this.movementsRepository.findMovementsByName(
      pilot_name,
    );

    return movements;
  }
}

export default GetMovementService;
