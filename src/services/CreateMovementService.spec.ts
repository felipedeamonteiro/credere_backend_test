import CreateMovementService from './CreateMovementService';
import FakeMovementsRepository from '../repositories/fakes/FakeMovementsRepository';

describe('CreateMovement', () => {
  const fakeMovementsRepository = new FakeMovementsRepository();
  const createMovement = new CreateMovementService(fakeMovementsRepository);

  it('should be able to create a new movement', async () => {
    const move = await createMovement.execute({
      movement: ['M', 'M'],
      pilot_name: 'John Doe',
    });

    expect(move).toHaveProperty('id');
  });
});
