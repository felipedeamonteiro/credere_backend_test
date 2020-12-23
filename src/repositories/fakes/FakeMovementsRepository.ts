import { uuid } from 'uuidv4';
import Movement from '../../models/Movement';
import IMovementsRepository from '../IMovementsRepository';

interface IRequest {
  pilot_name: string;
  movement: string;
}

class FakeMovementsRepository implements IMovementsRepository {
  private movements: Movement[] = [];

  public async createMovement({
    pilot_name,
    movement,
  }: IRequest): Promise<Movement> {
    const move = new Movement();

    Object.assign(move, { id: uuid(), movement, pilot_name });

    this.movements.push(move);

    return move;
  }

  public async findMovementsByName(
    pilot_name: string,
  ): Promise<Movement[] | undefined> {
    const findMovement = this.movements.filter(
      movement => movement.pilot_name === pilot_name,
    );

    return findMovement;
  }
}

export default FakeMovementsRepository;
