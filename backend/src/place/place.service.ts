import { Injectable } from '@nestjs/common';
import { PlaceRepository } from './place.repository';
import { CreatePlaceRequest } from './dto/CreatePlaceRequest';
import { PlaceNotFoundException } from './exception/PlaceNotFoundException';
import { PlaceAlreadyExistsException } from './exception/PlaceAlreadyExistsException';

@Injectable()
export class PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}

  async addPlace(createPlaceRequest: CreatePlaceRequest) {
    const { googlePlaceId } = createPlaceRequest;
    if (await this.placeRepository.findByGooglePlaceId(googlePlaceId)) {
      throw new PlaceAlreadyExistsException();
    }

    const place = createPlaceRequest.toEntity();
    const savedPlace = await this.placeRepository.save(place);
    return { id: savedPlace.id };
  }

  async getPlaces(query?: string, page: number = 1, pageSize: number = 10) {
    const result = query
      ? await this.placeRepository.searchByNameOrAddressQuery(
          query,
          page,
          pageSize,
        )
      : await this.placeRepository.findAll(page, pageSize);

    if (!result.length) {
      throw new PlaceNotFoundException();
    }
    return result;
  }

  async getPlace(id: number) {
    const place = await this.placeRepository.findById(id);
    if (!place) {
      throw new PlaceNotFoundException(id);
    }
    return place;
  }
}
