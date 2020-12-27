import GetCarCoordinateService from './GetCarCoordinateService';
import CreateAndCalculateCoordinatesService from './CreateAndCalculateCoordinatesService';
import FakeCarCoordinatesRepository from '../repositories/fakes/FakeCarCoordinatesRepository';
import ResetCoordinatesService from './ResetCoordinatesService';

describe('ResetCoordinates', () => {
  const fakeCarCoordinatesRepository = new FakeCarCoordinatesRepository();
  const getCarCoordinate = new GetCarCoordinateService(
    fakeCarCoordinatesRepository,
  );
  const createAndCalculateCoordinates = new CreateAndCalculateCoordinatesService(
    fakeCarCoordinatesRepository,
  );
  const resetCoordinates = new ResetCoordinatesService(
    fakeCarCoordinatesRepository,
  );

  it('should be able to reset the coordinates for the inital one', async () => {
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

    const savedCoordinates2 = await resetCoordinates.execute({
      pilot_name: 'John Doe',
    });

    const expectedData2 = {
      id: savedCoordinates2?.id,
      pilot_name: 'John Doe',
      xCoordinate: 0,
      yCoordinate: 0,
      carDirection: 'Direita',
    };

    expect(savedCoordinates2).toEqual(expectedData2);
  });
});
