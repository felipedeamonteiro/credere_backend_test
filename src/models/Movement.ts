import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// movements table model. It is created due typeorm configs
@Entity('movements')
class Movement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pilot_name: string;

  @Column()
  movement: string;
}

export default Movement;
