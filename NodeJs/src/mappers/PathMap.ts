import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPathPersistence } from '../dataschema/IPathPersistence';

import IPathDTO from "../dto/IPathDTO";
import { Path } from "../domain/path";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class PathMap extends Mapper<Path> {
  
  public static toDTO( path: Path): IPathDTO {
    return {
      id: path.id.toString(),
      warehouseDeparture: path.warehouseDeparture,
      warehouseDestination: path.warehouseDestination,
      distance: path.distance,
      travelTime: path.travelTime,
      energyNecessary: path.energyNecessary,
      additionalTime: path.additionalTime,
    } as IPathDTO;
  }

  public static toDomain (path: any | Model<IPathPersistence & Document> ): Path {
    const pathOrError = Path.create(
      path,
      new UniqueEntityID(path.domainId)
    );

    pathOrError.isFailure ? console.log(pathOrError.error) : '';

    return pathOrError.isSuccess ? pathOrError.getValue() : null;
  }

  public static toPersistence (path: Path): any {
    return {
      domainId: path.id.toString(),
      warehouseDeparture: path.warehouseDeparture,
      warehouseDestination: path.warehouseDestination,
      distance: path.distance,
      travelTime: path.travelTime,
      energyNecessary: path.energyNecessary,
      additionalTime: path.additionalTime,
    }
  }
}