import Movement from '../models/Movement';

interface IMovementDTO {
  pilot_name: string;
  movement: string;
}

export default interface IMovementRepository {
  findMovementsByName(pilot_name: string): Promise<Movement[] | undefined>;
  createMovement(moveData: IMovementDTO): Promise<Movement>;
}
