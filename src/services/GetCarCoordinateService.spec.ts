import GetCarCoordinateService from './GetCarCoordinateService';
import CreateAndCalculateCoordinatesService from './CreateAndCalculateCoordinatesService';
import FakeCarCoordinatesRepository from '../repositories/fakes/FakeCarCoordinatesRepository';

describe('GetCarCoordinate', () => {
  const fakeCarCoordinatesRepository = new FakeCarCoordinatesRepository();
  const getCarCoordinate = new GetCarCoordinateService(
    fakeCarCoordinatesRepository,
  );
  const createAndCalculateCoordinates = new CreateAndCalculateCoordinatesService(
    fakeCarCoordinatesRepository,
  );

  it('should be able to calculate a new coordinate for the car and get it from database', async () => {
    const newCoordinates = await createAndCalculateCoordinates.execute({
      movements: ['GE', 'M', 'M', 'M'],
      pilot_name: 'John Doe',
    });

    const savedCoordinates = await getCarCoordinate.execute({
      pilot_name: 'John Doe',
    });

    const expectedData = {
      id: newCoordinates.id,
      pilot_name: 'John Doe',
      xCoordinate: 0,
      yCoordinate: 3,
      carDirection: 'Cima',
    };

    expect(savedCoordinates).toEqual(expectedData);
  });
});
