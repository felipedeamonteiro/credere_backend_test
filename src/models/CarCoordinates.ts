import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('carCoordinates')
class CarCoordinates {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pilot_name: string;

  @Column()
  xCoordinate: number;

  @Column()
  yCoordinate: number;

  @Column()
  carDirection: 'right' | 'up' | 'left' | 'down';
}

export default CarCoordinates;
