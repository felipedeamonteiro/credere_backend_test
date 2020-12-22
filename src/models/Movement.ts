import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movements')
class Movement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  movement: string[];
}

export default Movement;
