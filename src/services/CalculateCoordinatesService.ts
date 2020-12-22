/* eslint-disable no-plusplus */
import { getCustomRepository } from 'typeorm';
import CarCoordinates from '../models/CarCoordinates';

import CarCoordinatesRepository from '../repositories/CarCoordinatesRepository';

interface IRequest {
  movements: string[];
}

class CalculateCoordinateService {
  public async execute({ movements }: IRequest): Promise<CarCoordinates> {
    const carCoordinatesRepository = getCustomRepository(
      CarCoordinatesRepository,
    );

    const carCoordinates = carCoordinatesRepository;

    for (let i = 0; i < movements.length; i++) {
      if (movements[i] === 'GD' || movements[i] === 'GE') {
        if (
          (carCoordinates.carDirection === 'right' && movements[i] === 'GE') ||
          (carCoordinates.carDirection === 'left' && movements[i] === 'GD')
        ) {
          carCoordinates.carDirection = 'up';
        } else if (
          (carCoordinates.carDirection === 'up' && movements[i] === 'GE') ||
          (carCoordinates.carDirection === 'down' && movements[i] === 'GD')
        ) {
          carCoordinates.carDirection = 'left';
        } else if (
          (carCoordinates.carDirection === 'left' && movements[i] === 'GE') ||
          (carCoordinates.carDirection === 'right' && movements[i] === 'GD')
        ) {
          carCoordinates.carDirection = 'down';
        } else if (
          (carCoordinates.carDirection === 'down' && movements[i] === 'GE') ||
          (carCoordinates.carDirection === 'up' && movements[i] === 'GD')
        ) {
          carCoordinates.carDirection = 'right';
        }
      } else {
        const carMovesRight = carCoordinates.carDirection === 'right';
        const carMovesLeft = carCoordinates.carDirection === 'left';
        const carMovesUp = carCoordinates.carDirection === 'up';
        const carMovesDown = carCoordinates.carDirection === 'down';

        if (carMovesRight) {
          carCoordinates.xCoordinate += 1;
          if (carCoordinates.xCoordinate === 5) {
            carCoordinates.xCoordinate -= 1;
            throw new Error(
              'Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
        if (carMovesLeft) {
          carCoordinates.xCoordinate -= 1;
          if (carCoordinates.xCoordinate === -1) {
            carCoordinates.xCoordinate += 1;
            throw new Error(
              'Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
        if (carMovesUp) {
          carCoordinates.yCoordinate += 1;
          if (carCoordinates.yCoordinate === 5) {
            carCoordinates.yCoordinate -= 1;
            throw new Error(
              'Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
        if (carMovesDown) {
          carCoordinates.yCoordinate -= 1;
          if (carCoordinates.yCoordinate === -1) {
            carCoordinates.yCoordinate += 1;
            throw new Error(
              'Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
      }
    }

    const newCarCoordinates = carCoordinatesRepository.create(carCoordinates);

    await carCoordinatesRepository.save(newCarCoordinates);

    return newCarCoordinates;
  }
}

export default CalculateCoordinateService;
