import { v4 as uuid } from 'uuid';

class Movement {
  id: string;

  movement: string[];

  constructor({ movement }: Omit<Movement, 'id'>) {
    this.id = uuid();
    this.movement = movement;
  }
}

export default Movement;
