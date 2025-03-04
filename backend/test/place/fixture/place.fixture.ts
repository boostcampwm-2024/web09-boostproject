import { Place } from '@src/place/entity/PlaceEntity';
import { PlaceFixtureType } from '@test/place/fixture/place.fixture.type';

export class PlaceFixture {
  static createPlace = ({
    googlePlaceId = `googlePlaceId${Date.now()}${Math.random()}`,
    name = 'Central Park',
    imageUrl = 'https://example.com/central_park.jpg',
    rating = 4.5,
    longitude = -73.965355,
    latitude = 40.782865,
    formattedAddress = 'New York, NY, USA',
    description = 'A large public park in New York City.',
    url = 'https://example.com/central_park',
  }: PlaceFixtureType) => {
    return new Place(
      googlePlaceId,
      name,
      imageUrl,
      rating,
      longitude,
      latitude,
      formattedAddress,
      description,
      url,
    );
  };
}
