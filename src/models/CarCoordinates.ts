import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// carCoordinates table model. It is created due typeorm configs
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
  carDirection: 'Direita' | 'Cima' | 'Esquerda' | 'Baixo';
}

export default CarCoordinates;
