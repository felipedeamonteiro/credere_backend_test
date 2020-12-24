import GetMovementsService from './GetMovementsService';
import CreateMovementService from './CreateMovementService';
import FakeMovementsRepository from '../repositories/fakes/FakeMovementsRepository';

describe('GetMovement', () => {
  const fakeMovementsRepository = new FakeMovementsRepository();
  const getMovements = new GetMovementsService(fakeMovementsRepository);
  const createMovement = new CreateMovementService(fakeMovementsRepository);

  it('should be able to create movements and get them from database', async () => {
    const newCoordinates1 = await createMovement.execute({
      movement: ['GE', 'M', 'M', 'M'],
      pilot_name: 'John Doe',
    });

    const newCoordinates2 = await createMovement.execute({
      movement: ['GD', 'M', 'M', 'M'],
      pilot_name: 'John Doe',
    });

    const movements = await getMovements.execute({
      pilot_name: 'John Doe',
    });

    const expectedData1 = {
      id: newCoordinates1.id,
      pilot_name: 'John Doe',
      movement: 'GE,M,M,M',
    };

    const expectedData2 = {
      id: newCoordinates2.id,
      pilot_name: 'John Doe',
      movement: 'GD,M,M,M',
    };

    expect(movements).toEqual([expectedData1, expectedData2]);
  });
});
