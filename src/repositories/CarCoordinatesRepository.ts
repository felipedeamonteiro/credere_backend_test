/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { getRepository, Repository } from 'typeorm';
import ICarCoordinatesRepository from './ICarCoordinatesRepository';
import CarCoordinates from '../models/CarCoordinates';

interface ICarCoordinatesDTO {
  pilot_name: string;
  movements: string[];
}

/**
 * All the methods related to this repository
 * Here the class implements the methods described in ICarCoordinatesRepository
 * and the constructor gets the CarCoordinates repository methods from typeorm.
 * It helps with the logics, connection with database and with SOLID principles
 */
class CarCoordinatesRepository implements ICarCoordinatesRepository {
  private ormRepository: Repository<CarCoordinates>;

  constructor() {
    this.ormRepository = getRepository(CarCoordinates);
  }

  public async getCarCoordinates(
    pilot_name: string,
  ): Promise<CarCoordinates | undefined> {
    // first it's searched a coordinates with pilot's name
    const coordinates = await this.ormRepository.findOne({
      where: { pilot_name },
    });

    // If don't, we create an initial one and return it
    if (!coordinates) {
      const initialCarCoordinates = this.ormRepository.create({
        pilot_name,
        xCoordinate: 0,
        yCoordinate: 0,
        carDirection: 'Direita',
      });
      await this.ormRepository.save(initialCarCoordinates);
      return initialCarCoordinates;
    }

    // If so, it's just returned
    return coordinates;
  }

  public async resetCoordinates(pilot_name: string): Promise<CarCoordinates> {
    const pilotCoordinatesExists = await this.ormRepository.findOne({
      where: { pilot_name },
    });
    // most of the methods are started with the search of the pilots coordinates
    // because the save method from typeorm save/store the data in DB but also
    // update an existing one

    if (pilotCoordinatesExists) {
      pilotCoordinatesExists.xCoordinate = 0;
      pilotCoordinatesExists.yCoordinate = 0;
      pilotCoordinatesExists.carDirection = 'Direita';

      const resetedCoordinates = await this.ormRepository.save(
        pilotCoordinatesExists,
      );

      return resetedCoordinates;
    }
    throw new Error('There is no pilot activity yet.');
  }

  // Here we have the most important method, becuase it calculates the movement
  // of the probe, validates if the probe goes or not to a wrong coordinate,
  // updates the coordinates and return the correct values or the errors.
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
        carDirection: 'Direita',
      });
      await this.ormRepository.save(marsCarCoordinates);
    }

    for (let i = 0; i < movements.length; i++) {
      if (movements[i] === 'GD' || movements[i] === 'GE') {
        if (
          (marsCarCoordinates.carDirection === 'Direita' &&
            movements[i] === 'GE') ||
          (marsCarCoordinates.carDirection === 'Esquerda' &&
            movements[i] === 'GD')
        ) {
          marsCarCoordinates.carDirection = 'Cima';
          await this.ormRepository.save(marsCarCoordinates);
        } else if (
          (marsCarCoordinates.carDirection === 'Cima' &&
            movements[i] === 'GE') ||
          (marsCarCoordinates.carDirection === 'Baixo' && movements[i] === 'GD')
        ) {
          marsCarCoordinates.carDirection = 'Esquerda';
          await this.ormRepository.save(marsCarCoordinates);
        } else if (
          (marsCarCoordinates.carDirection === 'Esquerda' &&
            movements[i] === 'GE') ||
          (marsCarCoordinates.carDirection === 'Direita' &&
            movements[i] === 'GD')
        ) {
          marsCarCoordinates.carDirection = 'Baixo';
          await this.ormRepository.save(marsCarCoordinates);
        } else if (
          (marsCarCoordinates.carDirection === 'Baixo' &&
            movements[i] === 'GE') ||
          (marsCarCoordinates.carDirection === 'Cima' && movements[i] === 'GD')
        ) {
          marsCarCoordinates.carDirection = 'Direita';
          await this.ormRepository.save(marsCarCoordinates);
        }
      } else {
        const carMovesRight = marsCarCoordinates.carDirection === 'Direita';
        const carMovesLeft = marsCarCoordinates.carDirection === 'Esquerda';
        const carMovesUp = marsCarCoordinates.carDirection === 'Cima';
        const carMovesDown = marsCarCoordinates.carDirection === 'Baixo';

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
