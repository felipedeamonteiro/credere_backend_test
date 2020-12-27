/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { v4 } from 'uuid';
import ICarCoordinatesRepository from '../ICarCoordinatesRepository';
import CarCoordinates from '../../models/CarCoordinates';

interface ICarCoordinatesDTO {
  pilot_name: string;
  movements: string[];
}

class CarCoordinatesRepository implements ICarCoordinatesRepository {
  private carCoordinates: CarCoordinates[] = [];

  public async getCarCoordinates(
    pilot_name: string,
  ): Promise<CarCoordinates | undefined> {
    const coordinates = this.carCoordinates.filter(
      coordinate => coordinate.pilot_name === pilot_name,
    );

    if (coordinates.length === 0) {
      const initialCarCoordinates = new CarCoordinates();
      Object.assign(initialCarCoordinates, {
        id: v4(),
        pilot_name,
        xCoordinate: 0,
        yCoordinate: 0,
        carDirection: 'Direita',
      });
      this.carCoordinates.push(initialCarCoordinates);
      return initialCarCoordinates;
    }

    return coordinates[0];
  }

  public async resetCoordinates(pilot_name: string): Promise<CarCoordinates> {
    const pilotCoordinatesExists = this.carCoordinates.filter(
      coordinate => coordinate.pilot_name === pilot_name,
    );

    if (pilotCoordinatesExists.length !== 0) {
      const resetedCoordinates = new CarCoordinates();
      this.carCoordinates.filter(
        coordinate => coordinate.pilot_name !== pilot_name,
      );
      Object.assign(resetedCoordinates, {
        id: v4(),
        pilot_name,
        xCoordinate: 0,
        yCoordinate: 0,
        carDirection: 'Direita',
      });

      this.carCoordinates.push(resetedCoordinates);

      return resetedCoordinates;
    }
    throw new Error('There is no pilot activity yet.');
  }

  public async createAndCalculateCarCoordinates({
    pilot_name,
    movements,
  }: ICarCoordinatesDTO): Promise<CarCoordinates> {
    let marsCarCoordinates = this.carCoordinates.filter(
      coordinate => coordinate.pilot_name === pilot_name,
    );

    if (marsCarCoordinates.length === 0) {
      marsCarCoordinates[0] = new CarCoordinates();
      Object.assign(marsCarCoordinates[0], {
        id: v4(),
        pilot_name,
        xCoordinate: 0,
        yCoordinate: 0,
        carDirection: 'Direita',
      });

      this.carCoordinates.push(marsCarCoordinates[0]);
    }

    for (let i = 0; i < movements.length; i++) {
      if (movements[i] === 'GD' || movements[i] === 'GE') {
        if (
          (marsCarCoordinates[0].carDirection === 'Direita' &&
            movements[i] === 'GE') ||
          (marsCarCoordinates[0].carDirection === 'Esquerda' &&
            movements[i] === 'GD')
        ) {
          marsCarCoordinates[0].carDirection = 'Cima';
          this.carCoordinates.push(marsCarCoordinates[0]);
        } else if (
          (marsCarCoordinates[0].carDirection === 'Cima' &&
            movements[i] === 'GE') ||
          (marsCarCoordinates[0].carDirection === 'Baixo' &&
            movements[i] === 'GD')
        ) {
          marsCarCoordinates[0].carDirection = 'Esquerda';
          this.carCoordinates.push(marsCarCoordinates[0]);
        } else if (
          (marsCarCoordinates[0].carDirection === 'Esquerda' &&
            movements[i] === 'GE') ||
          (marsCarCoordinates[0].carDirection === 'Direita' &&
            movements[i] === 'GD')
        ) {
          marsCarCoordinates[0].carDirection = 'Baixo';
          this.carCoordinates.push(marsCarCoordinates[0]);
        } else if (
          (marsCarCoordinates[0].carDirection === 'Baixo' &&
            movements[i] === 'GE') ||
          (marsCarCoordinates[0].carDirection === 'Cima' &&
            movements[i] === 'GD')
        ) {
          marsCarCoordinates[0].carDirection = 'Direita';
          this.carCoordinates.push(marsCarCoordinates[0]);
        }
      } else {
        const carMovesRight = marsCarCoordinates[0].carDirection === 'Direita';
        const carMovesLeft = marsCarCoordinates[0].carDirection === 'Esquerda';
        const carMovesUp = marsCarCoordinates[0].carDirection === 'Cima';
        const carMovesDown = marsCarCoordinates[0].carDirection === 'Baixo';

        if (carMovesRight) {
          marsCarCoordinates[0].xCoordinate += 1;
          if (marsCarCoordinates[0].xCoordinate === 5) {
            marsCarCoordinates[0].xCoordinate -= 1;
            this.carCoordinates.push(marsCarCoordinates[0]);
            throw new Error(
              'Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
        if (carMovesLeft) {
          marsCarCoordinates[0].xCoordinate -= 1;
          if (marsCarCoordinates[0].xCoordinate === -1) {
            marsCarCoordinates[0].xCoordinate += 1;
            this.carCoordinates.push(marsCarCoordinates[0]);
            throw new Error(
              'Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
        if (carMovesUp) {
          marsCarCoordinates[0].yCoordinate += 1;
          if (marsCarCoordinates[0].yCoordinate === 5) {
            marsCarCoordinates[0].yCoordinate -= 1;
            this.carCoordinates.push(marsCarCoordinates[0]);
            throw new Error(
              'Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
        if (carMovesDown) {
          marsCarCoordinates[0].yCoordinate -= 1;
          if (marsCarCoordinates[0].yCoordinate === -1) {
            marsCarCoordinates[0].yCoordinate += 1;
            this.carCoordinates.push(marsCarCoordinates[0]);
            throw new Error(
              'Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
      }
    }

    this.carCoordinates.push(marsCarCoordinates[0]);

    return marsCarCoordinates[0];
  }
}

export default CarCoordinatesRepository;
