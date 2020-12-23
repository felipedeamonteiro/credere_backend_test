import { uuid } from 'uuidv4';
import Movement from '../../models/Movement';

interface IRequest {
  pilot_name: string;
  movement: string;
}

class MovementsRepository {
  private movements: Movement[] = [];

  public create({ pilot_name, movement }: IRequest): Movement {
    const move = new Movement();

    Object.assign(move, { id: uuid(), movement, pilot_name });

    this.movements.push(move);

    return move;
  }
}

export default MovementsRepository;
