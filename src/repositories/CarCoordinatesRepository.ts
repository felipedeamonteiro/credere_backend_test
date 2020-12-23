/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { getRepository, Repository } from 'typeorm';
import ICarCoordinatesRepository from './ICarCoordinatesRepository';
import CarCoordinates from '../models/CarCoordinates';

interface ICarCoordinatesDTO {
  pilot_name: string;
  movements: string[];
}

class CarCoordinatesRepository implements ICarCoordinatesRepository {
  private ormRepository: Repository<CarCoordinates>;

  constructor() {
    this.ormRepository = getRepository(CarCoordinates);
  }

  public async getCarCoordinates(
    pilot_name: string,
  ): Promise<CarCoordinates | undefined> {
    const coordinates = await this.ormRepository.findOne({
      where: { pilot_name },
    });

    if (!coordinates) {
      const initialCarCoordinates = this.ormRepository.create({
        pilot_name,
        xCoordinate: 0,
        yCoordinate: 0,
        carDirection: 'right',
      });
      await this.ormRepository.save(initialCarCoordinates);
      return initialCarCoordinates;
    }

    return coordinates;
  }

  public async resetCoordinates(pilot_name: string): Promise<CarCoordinates> {
    const pilotCoordinatesExists = await this.ormRepository.findOne({
      where: { pilot_name },
    });

    if (pilotCoordinatesExists) {
      pilotCoordinatesExists.xCoordinate = 0;
      pilotCoordinatesExists.yCoordinate = 0;
      pilotCoordinatesExists.carDirection = 'right';

      const resetedCoordinates = await this.ormRepository.save(
        pilotCoordinatesExists,
      );

      return resetedCoordinates;
    }
    throw new Error('There is no pilot activity yet.');
  }

  public async createAndCalculateCarCoordinates({
    pilot_name,
    movements,
  }: ICarCoordinatesDTO): Promise<CarCoordinates> {
    let marsCarCoordinates = await this.ormRepository.findOne({
      where: { pilot_name },
    });

    if (!marsCarCoordinates) {
      marsCarCoordinates = this.ormRepository.create({
        pilot_name,
        xCoordinate: 0,
        yCoordinate: 0,
        carDirection: 'right',
      });
      await this.ormRepository.save(marsCarCoordinates);
    }

    for (let i = 0; i < movements.length; i++) {
      if (movements[i] === 'GD' || movements[i] === 'GE') {
        if (
          (marsCarCoordinates.carDirection === 'right' &&
            movements[i] === 'GE') ||
          (marsCarCoordinates.carDirection === 'left' && movements[i] === 'GD')
        ) {
          marsCarCoordinates.carDirection = 'up';
          await this.ormRepository.save(marsCarCoordinates);
        } else if (
          (marsCarCoordinates.carDirection === 'up' && movements[i] === 'GE') ||
          (marsCarCoordinates.carDirection === 'down' && movements[i] === 'GD')
        ) {
          marsCarCoordinates.carDirection = 'left';
          await this.ormRepository.save(marsCarCoordinates);
        } else if (
          (marsCarCoordinates.carDirection === 'left' &&
            movements[i] === 'GE') ||
          (marsCarCoordinates.carDirection === 'right' && movements[i] === 'GD')
        ) {
          marsCarCoordinates.carDirection = 'down';
          await this.ormRepository.save(marsCarCoordinates);
        } else if (
          (marsCarCoordinates.carDirection === 'down' &&
            movements[i] === 'GE') ||
          (marsCarCoordinates.carDirection === 'up' && movements[i] === 'GD')
        ) {
          marsCarCoordinates.carDirection = 'right';
          await this.ormRepository.save(marsCarCoordinates);
        }
      } else {
        const carMovesRight = marsCarCoordinates.carDirection === 'right';
        const carMovesLeft = marsCarCoordinates.carDirection === 'left';
        const carMovesUp = marsCarCoordinates.carDirection === 'up';
        const carMovesDown = marsCarCoordinates.carDirection === 'down';

        if (carMovesRight) {
          marsCarCoordinates.xCoordinate += 1;
          if (marsCarCoordinates.xCoordinate === 5) {
            marsCarCoordinates.xCoordinate -= 1;
            await this.ormRepository.save(marsCarCoordinates);
            throw new Error(
              'Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
        if (carMovesLeft) {
          marsCarCoordinates.xCoordinate -= 1;
          if (marsCarCoordinates.xCoordinate === -1) {
            marsCarCoordinates.xCoordinate += 1;
            await this.ormRepository.save(marsCarCoordinates);
            throw new Error(
              'Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
        if (carMovesUp) {
          marsCarCoordinates.yCoordinate += 1;
          if (marsCarCoordinates.yCoordinate === 5) {
            marsCarCoordinates.yCoordinate -= 1;
            await this.ormRepository.save(marsCarCoordinates);
            throw new Error(
              'Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
        if (carMovesDown) {
          marsCarCoordinates.yCoordinate -= 1;
          if (marsCarCoordinates.yCoordinate === -1) {
            marsCarCoordinates.yCoordinate += 1;
            await this.ormRepository.save(marsCarCoordinates);
            throw new Error(
              'Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
      }
    }

    await this.ormRepository.save(marsCarCoordinates);

    return marsCarCoordinates;
  }
}

export default CarCoordinatesRepository;
