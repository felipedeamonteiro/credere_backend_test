import { Entity, Column } from 'typeorm';

@Entity('carCoordinates')
class CarCoordinates {
  @Column()
  xCoordinate: number;

  @Column()
  yCoordinate: number;

  @Column()
  carDirection: 'right' | 'up' | 'left' | 'down';
}

export default CarCoordinates;
