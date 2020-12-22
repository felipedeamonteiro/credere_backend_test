/* eslint-disable no-plusplus */
import { getCustomRepository } from 'typeorm';
import CarCoordinates from '../models/CarCoordinates';

import CarCoordinatesRepository from '../repositories/CarCoordinatesRepository';

interface IRequest {
  pilot_name: string;
  movements: string[];
}

interface IMarsCarCoords {
  xCoordinate: number;
  yCoordinate: number;
  carDirection: 'right' | 'up' | 'left' | 'down';
}

class CalculateCoordinateService {
  public async execute({
    pilot_name,
    movements,
  }: IRequest): Promise<CarCoordinates> {
    const carCoordinatesRepository = getCustomRepository(
      CarCoordinatesRepository,
    );
    let marsCarCoordinates: IMarsCarCoords;

    const carCoordinates = await carCoordinatesRepository.findOne({
      where: { pilot_name },
    });
    if (!carCoordinates) {
      marsCarCoordinates = {
        xCoordinate: 0,
        yCoordinate: 0,
        carDirection: 'right',
      };
    } else {
      marsCarCoordinates = {
        xCoordinate: carCoordinates.xCoordinate,
        yCoordinate: carCoordinates.yCoordinate,
        carDirection: carCoordinates.carDirection,
      };
    }

    for (let i = 0; i < movements.length; i++) {
      if (movements[i] === 'GD' || movements[i] === 'GE') {
        if (
          (marsCarCoordinates.carDirection === 'right' &&
            movements[i] === 'GE') ||
          (marsCarCoordinates.carDirection === 'left' && movements[i] === 'GD')
        ) {
          marsCarCoordinates.carDirection = 'up';
        } else if (
          (marsCarCoordinates.carDirection === 'up' && movements[i] === 'GE') ||
          (marsCarCoordinates.carDirection === 'down' && movements[i] === 'GD')
        ) {
          marsCarCoordinates.carDirection = 'left';
        } else if (
          (marsCarCoordinates.carDirection === 'left' &&
            movements[i] === 'GE') ||
          (marsCarCoordinates.carDirection === 'right' && movements[i] === 'GD')
        ) {
          marsCarCoordinates.carDirection = 'down';
        } else if (
          (marsCarCoordinates.carDirection === 'down' &&
            movements[i] === 'GE') ||
          (marsCarCoordinates.carDirection === 'up' && movements[i] === 'GD')
        ) {
          marsCarCoordinates.carDirection = 'right';
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
            throw new Error(
              'Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
        if (carMovesLeft) {
          marsCarCoordinates.xCoordinate -= 1;
          if (marsCarCoordinates.xCoordinate === -1) {
            marsCarCoordinates.xCoordinate += 1;
            throw new Error(
              'Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
        if (carMovesUp) {
          marsCarCoordinates.yCoordinate += 1;
          if (marsCarCoordinates.yCoordinate === 5) {
            marsCarCoordinates.yCoordinate -= 1;
            throw new Error(
              'Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
        if (carMovesDown) {
          marsCarCoordinates.yCoordinate -= 1;
          if (marsCarCoordinates.yCoordinate === -1) {
            marsCarCoordinates.yCoordinate += 1;
            throw new Error(
              'Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
      }
    }

    const newCarCoordinates = carCoordinatesRepository.create({
      pilot_name,
      xCoordinate: marsCarCoordinates.xCoordinate,
      yCoordinate: marsCarCoordinates.yCoordinate,
      carDirection: marsCarCoordinates.carDirection,
    });

    await carCoordinatesRepository.save(newCarCoordinates);

    return newCarCoordinates;
  }
}

export default CalculateCoordinateService;
