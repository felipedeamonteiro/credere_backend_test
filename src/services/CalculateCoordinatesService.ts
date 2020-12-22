/* eslint-disable no-plusplus */
import CarCoordinates from '../models/CarCoordinates';

import CarCoordinatesRepository from '../repositories/CarCoordinatesRepository';
import MovementsRepository from '../repositories/MovementsRepository';

interface IRequest {
  movements: string[];
}

class CalculateCoordinateService {
  private movementsRepository: MovementsRepository;

  private carCoordinatesRepository: CarCoordinatesRepository;

  constructor(
    movementsRepository: MovementsRepository,
    carCoordinatesRepository: CarCoordinatesRepository,
  ) {
    this.movementsRepository = movementsRepository;
    this.carCoordinatesRepository = carCoordinatesRepository;
  }

  public execute({ movements }: IRequest): CarCoordinates {
    const carCoordinates = this.carCoordinatesRepository.getCoordinates();

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
              'erro: Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
        if (carMovesLeft) {
          carCoordinates.xCoordinate -= 1;
          if (carCoordinates.xCoordinate === -1) {
            carCoordinates.xCoordinate += 1;
            throw new Error(
              'erro: Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
        if (carMovesUp) {
          carCoordinates.yCoordinate += 1;
          if (carCoordinates.yCoordinate === 5) {
            carCoordinates.yCoordinate -= 1;
            throw new Error(
              'erro: Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
        if (carMovesDown) {
          carCoordinates.yCoordinate -= 1;
          if (carCoordinates.yCoordinate === -1) {
            carCoordinates.yCoordinate += 1;
            throw new Error(
              'erro: Um movimento inválido foi detectado, infelizmente a sonda ainda não possui a habilidade de #vvv',
            );
          }
        }
      }
    }

    // const carCoordinates = this.carCoordinatesRepository.create({
    //   xCoordinate,
    //   yCoordinate,
    //   carDirection,
    // });

    return carCoordinates;
  }
}

export default CalculateCoordinateService;
