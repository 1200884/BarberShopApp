import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IPlaceDTO} from "../dto/IPlaceDTO";
import { Document, Model } from 'mongoose';

import { Place } from "../domain/place";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";


import { IPlacePersistence } from '../dataschema/IPlacePersistence';

export class PlaceMap extends Mapper<Place> {

  public static toDTO( place: Place): IPlaceDTO {
    return {
      id: place.id.toString(),
      name: place.name,
      address: place.address,
      image: place.image,
      type: place.type
    } as IPlaceDTO;
  }

  public static toDomain (raw: any | Model<IPlacePersistence & Document>): Place {
    //console.log("todomain")
    //console.log("raw "+raw.name)
    const placeOrError = Place.createFromBD(raw, new UniqueEntityID(raw.domainId));
    placeOrError.isFailure ? console.log(placeOrError.error) : '';
    //console.log(placeOrError )
    return placeOrError.isSuccess ? placeOrError.getValue() : null;
  }

  public static toPersistence (place: Place): any {
    const a = {
      domainId: place.id.toString(),
      name: place.name,
      address: place.address,
      image: place.image,
      type: place.type,
    }
    return a;
  }
}