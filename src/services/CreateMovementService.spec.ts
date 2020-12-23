import CreateMovementService from './CreateMovementService';

describe('CreateMovement', () => {
  it('should be able to create a new movement', async () => {
    const createMovement = new CreateMovementService();

    const move = await createMovement.execute({
      movement: ['M', 'M'],
      pilot_name: 'John Doe',
    });

    expect(move).toHaveProperty('id');
  });
});
