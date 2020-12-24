import CreateAndCalculateCoordinatesService from './CreateAndCalculateCoordinatesService';
import FakeCarCoordinatesRepository from '../repositories/fakes/FakeCarCoordinatesRepository';

describe('CreateAndCalculateCoordinates', () => {
  const fakeCarCoordinatesRepository = new FakeCarCoordinatesRepository();
  const createAndCalculateCoordinates = new CreateAndCalculateCoordinatesService(
    fakeCarCoordinatesRepository,
  );

  it('should be able to calculate a new coordinate for the car', async () => {
    const newCoordinates = await createAndCalculateCoordinates.execute({
      movements: ['GE', 'M', 'M', 'M'],
      pilot_name: 'John Doe',
    });
    const expectedData = {
      pilot_name: 'John Doe',
      xCoordinate: 0,
      yCoordinate: 3,
      carDirection: 'up',
    };

    expect(newCoordinates).toHaveProperty('id');
    expect(newCoordinates.pilot_name).toEqual(expectedData.pilot_name);
    expect(newCoordinates.xCoordinate).toEqual(expectedData.xCoordinate);
    expect(newCoordinates.yCoordinate).toEqual(expectedData.yCoordinate);
    expect(newCoordinates.carDirection).toEqual(expectedData.carDirection);
  });
});
