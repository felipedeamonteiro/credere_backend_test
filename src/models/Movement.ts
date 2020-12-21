import { v4 as uuid } from 'uuid';

class Movement {
  id: string;

  movement: string;

  constructor(movement: string) {
    this.id = uuid();
    this.movement = movement;
  }
}

export default Movement;
